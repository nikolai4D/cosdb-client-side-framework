import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";
import {deleteChildren} from "./deleteChildren.mjs";
import {deleteItem} from "./deleteItem.mjs";
import { writeModel } from "../requests/writeModel.mjs";
// import { createSlot } from "../_3_slot/createSlot.mjs";
import { newComponentFromType } from "../_4_component/newComponentFromType.mjs";

export async function updateModelIfHasChanged() {
    /*
    This is the main function that gets triggered when the CMS app is loaded.
    It checks if the model has changed, and if it has, it updates the model.

    It does this by comparing the values of the files in the model with the values of the files in the file system.
    If the values are different, it updates the model.

    To update the model, we first update the state. We then update the model.json with the state.

    */

    await action_readModel();

    // get all viewTemplate files
    const viewTemplateFiles = await viewTemplateValues();


    for (const view of State.views) {

        // get the viewTemplate from state with the view as the parent
        const viewTemplateInState = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        // if the viewTemplate doesn't exist, alert
        if (!viewTemplateFiles.includes(viewTemplateInState.value)){
            removeFromState(viewTemplateInState);
        }

        // get slots from state with the viewTemplate as the parent
        const slotsInState = State.slots.filter(slot => slot.parentId === viewTemplateInState.id)
        
        // get slots from the viewTemplate file
        const slotsInFile = await slotValues(viewTemplateInState.value);


        // get the slot values from the state and the file
        let slotsInStateValues = slotsInState.map(slot => slot.value);
        let slotsInFileValues = slotsInFile.map(slot => slot.slot);

        // if the slots don't match, alert
        if (!sameMembers(slotsInStateValues, slotsInFileValues)) {
            const slotsToRemove = slotsInState.filter(slot => !slotsInFileValues.includes(slot.value));
            const slotsToAdd = slotsInFile.filter(slot => !slotsInStateValues.includes(slot.slot));

            await removeFromState(slotsToRemove);
            await addToState(slotsToAdd, viewTemplateInState.id, true);
        }


        for (const slot of slotsInState) {
            const componentPlaceInState = State.components.find(
                (component) => component.parentId === slot.id
            );

            if (!componentPlaceInState) {
                console.warn(`No component in slot "${slot.value}" <-- viewtemplate "${viewTemplateInState.value}" <-- view "${view.value}"`);
                continue;
            }

            const componentFiles = await componentValues();

            for (const comp of ["organisms", "molecules", "atoms"]) {

                const componentInState = State[comp].find(
                    (component) => component.parentId === componentPlaceInState.id
                );

                if (!componentInState) {
                    continue;
                }

                if (!componentFiles.includes(componentInState.value)){
                    removeFromState(componentInState);
                }

                if (comp === "organisms") {
                    await checkOrganismSubComponents(componentInState, componentFiles);
                }
                else if (comp === "molecules") {
                    await checkMoleculeSubComponents(componentInState, componentFiles);
                }
                else if (comp === "atoms") {
                    await checkAtom(componentInState, componentFiles);
                }
            }
        }
    }

    await writeModel(await State);
}


async function checkOrganismSubComponents(organismInState, componentFiles){
    checkSubFunction(organismInState)

    const organismFile = await getComponentFile(organismInState, "organisms")

    for (const comp of ["organism", "molecule"]) {

        const s_componentInState = State[comp+"s"].filter(
            (s_comp) => s_comp.parentId === organismInState.id
        );

        let areSubcompFiles = isElementsAlsoInArray(componentFiles, s_componentInState.map(s_comp => s_comp.value))

        if (!areSubcompFiles){
            // filter out the subcomponents that are not in the array
            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))
            removeFromState(subComponentsToRemove);
        }

        checkAndUpdateStateAndFile(s_componentInState, organismFile, comp, organismInState.id);

        if (comp === "organism"){
            for (let organism of s_componentInState) {
                await checkOrganismSubComponents(organism, componentFiles)
            }
        }

        else if (comp === "molecule"){
            for (let molecule of s_componentInState) {
                await checkMoleculeSubComponents(molecule, componentFiles)
            }
        }
    }
}

function checkAndUpdateStateAndFile(s_componentInState, organismFile, comp, parentId) {
    for (let s_comp of s_componentInState) {
        checkIfSubcomponentStateMatchInFile(s_comp, organismFile, comp);
    }

    for (let s_comp of organismFile[comp + "s"]) {
        checkIfSubcomponentFileMatchState(s_comp, s_componentInState, comp, parentId);
    }
}

async function checkMoleculeSubComponents(moleculeInState, componentFiles){
    checkSubFunction(moleculeInState)

    const moleculeFile = await getComponentFile(moleculeInState, "molecules");

    for (const comp of ["molecule", "atom"]) {

        const s_componentInState = State[comp+"s"].filter(
            (s_comp) => s_comp.parentId === moleculeInState.id
        );

        let areSubcompFiles = isElementsAlsoInArray(componentFiles, s_componentInState.map(s_comp => s_comp.value))

        if (!areSubcompFiles){
            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))
            removeFromState(subComponentsToRemove);
        }

        if (moleculeFile[comp+"s"] == undefined){
            moleculeFile[comp+"s"] = []
        }
    
        checkAndUpdateStateAndFile(s_componentInState, moleculeFile, comp, moleculeInState.id);

        if (comp === "molecule"){
            for (let molecule of s_componentInState) {
                await checkMoleculeSubComponents(molecule, componentFiles)
            }
        }

        else if (comp === "atom"){
            for (let atom of s_componentInState) {
                await checkAtom(atom, componentFiles)
            }
        }
    }
}

async function getComponentFile(componentInState, type) {
    let filename = componentInState.value;
    let file = filename + ".mjs";

    const componentFile = await importModuleFromFile(
        file,
        filename,
        type
    );
    return componentFile;
}

async function checkAtom(atomInState, componentFiles){
    let areAtomsFiles = componentFiles.includes(atomInState.value)

    if (!areAtomsFiles){
        removeFromState(atomInState);
    }

    checkSubFunction(atomInState)
}

function compareComponents(subComponentState, subComponentFile, type) {
    return `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`;
}


function checkIfSubcomponentFileMatchState(subComponentFile, subComponentsState, type,parentId){
    // checks if subComponentFile is in subComponentsState
    
    const isMatch = subComponentsState.some(subComponentState => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        let parentIdToComp = parentId
        if (subComponentsState[0] !== undefined){
            parentIdToComp = subComponentsState[0].parentId
        }
        addToState(subComponentFile, parentIdToComp);
    }
}

function checkIfSubcomponentStateMatchInFile(subComponentState, componentFile, type) {
    const isMatch = componentFile[type+"s"].some(subComponentFile => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        // remove subComponentState from state
        const subComponentToRemove = subComponentState;
        removeFromState(subComponentToRemove);
    }
}

async function checkSubFunction(parentInState) {
    const s_functionsInState = State.functions.filter(
        (func) => func.parentId === parentInState.id
    );

    const functionFiles = await functionValues();

    let areFunctionsFiles = isElementsAlsoInArray(functionFiles, s_functionsInState.map(func => func.value));

    if (!areFunctionsFiles) {
        const functionsToRemove = s_functionsInState.filter(func => !functionFiles.includes(func.value))
        removeFromState(functionsToRemove);
    }
}

// This function checks if an array has the same elements regardless of order
function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

// This function checks if all target elements are also in the array
const isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));


async function removeFromState(obj){
    console.warn("Removing from State: ", obj)

    if (Array.isArray(obj)){
        for (const aObj of obj){
            await deleteChildren(aObj.id)
            await deleteItem(aObj.id)
        }
    }

    else {
    await deleteChildren(obj.id)
    await deleteItem(obj.id)
    }
}

async function addToState(obj, parentId, isSlot = false){

    if (isSlot) {
        for (const aSlot of obj){

        const type = "slot"
        const key = type
        const value = aSlot.slot
        const objToSave = await newComponentFromType(key, value, parentId, type)
        console.warn("Adding to State: ", objToSave)
    
         // add to state 
        await State.slots.push(objToSave) 
        console.log("State.slots: ", State)

        }

    }
    else {
    
        const type = obj.component.title.toLowerCase()
        const key = type+" "+obj.id
        const value = obj[type]
        const objToSave = await newComponentFromType(key, value, parentId, type)

        if (type === "atom"){
            const type = "atomValue"
            const key = "value"
            const value = "value placeholder"
            const atomValueToSave = await newComponentFromType(key, value, objToSave.id, type)
            State[type+"s"].push(atomValueToSave)

        }

        // add to state 
        console.warn("Adding to State: ", objToSave)
        State[type+"s"].push(objToSave)

        const compTypes = ["organism", "molecule","atom"]
        for (const type of compTypes){

            if (obj.component[type+"s"]){
                for (const comp of obj.component[type+"s"]){
                    addToState(comp, objToSave.id)
            }
        }
    }
    }

}