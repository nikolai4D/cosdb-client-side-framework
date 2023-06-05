import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";


export async function updateModelIfHasChanged() {
    /*
    This is the main function that gets triggered when the CMS app is loaded.
    It checks if the model has changed, and if it has, it updates the model.

    It does this by comparing the values of the files in the model with the values of the files in the file system.
    If the values are different, it updates the model.

    To update the model, we first update the state. We then update the model.json with the state.

    */

    const readModel = await action_readModel();

    const viewTemplateFiles = await viewTemplateValues();

    // console.info(viewTemplateFiles, "values")

    for (const view of State.views) {
        // add viewTemplates from state

        // get viewTemplate from state
        const viewTemplateInState = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        // if the viewTemplate doesn't exist, alert
        if (!viewTemplateFiles.includes(viewTemplateInState.value)){
            console.info("ViewTemplate has changed! : ", viewTemplateInState)
            // continue
        }

        // get slots from state with the viewTemplate as the parent
        const slotsInState = State.slots.filter(slot => slot.parentId === viewTemplateInState.id)
        
        // get slots from the viewTemplate file
        const slotsInFile = await slotValues(viewTemplateInState.value);

        if (slotsInState.length !== slotsInFile.length){
            console.info("Slots have changed! : ", viewTemplateInState);

            throw new Error("Length of slots in state and file are not the same!", slotsInState, slotsInFile)
        }

        // get the slot values from the state and the file
        let slotsInStateValues = slotsInState.map(slot => slot.value);
        let slotsInFileValues = slotsInFile.map(slot => slot.slot);

        // if the slots don't match, alert
        if (!sameMembers(slotsInStateValues, slotsInFileValues)) {
            console.info("Slots have changed! : ", viewTemplateInState);

            const slotsToRemove = slotsInState.filter(slot => !slotsInFileValues.includes(slot.value));
            const slotsToAdd = slotsInFile.filter(slot => !slotsInStateValues.includes(slot.slot));

            removeFromState(slotsToRemove);
            addToState(slotsToAdd);
        }


        for (const slot of slotsInState) {
            const componentPlaceInState = State.components.find(
                (component) => component.parentId === slot.id
            );

            if (!componentPlaceInState) {
                console.info(`No component in view "${view.value}" -> viewtemplate "${viewTemplateInState.value}" -> slot "${slot.value}"`);
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
                    console.info("Component has changed! : ", componentInState);
                    
                    // remove componentInState from state
                    const componentToRemove = componentInState;
                    removeFromState(componentToRemove);
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
            console.info("Component has changed! : ", s_componentInState);

            // filter out the subcomponents that are not in the array
            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))
            removeFromState(subComponentsToRemove);
        }

        checkAndUpdateStateAndFile(s_componentInState, organismFile, comp);

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

function checkAndUpdateStateAndFile(s_componentInState, organismFile, comp) {
    for (let s_comp of s_componentInState) {
        checkIfSubcomponentStateMatchInFile(s_comp, organismFile, comp);
    }

    for (let s_comp of organismFile[comp + "s"]) {
        checkIfSubcomponentFileMatchState(s_comp, s_componentInState, comp);
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
            console.info("Component has changed! : ", s_componentInState);

            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))
            removeFromState(subComponentsToRemove);
        }

        if (moleculeFile[comp+"s"] == undefined){
            moleculeFile[comp+"s"] = []
        }
    
        checkAndUpdateStateAndFile(s_componentInState, moleculeFile, comp);

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
        console.info("Atom has changed! : ", atomInState);

        const atomsToRemove = atomInState
        removeFromState(atomsToRemove);
    }

    checkSubFunction(atomInState)
}

function compareComponents(subComponentState, subComponentFile, type) {
    return `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`;
}


function checkIfSubcomponentFileMatchState(subComponentFile, subComponentsState, type){
    const isMatch = subComponentsState.some(subComponentState => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        console.info("Component has changed! ADDED to state: ", subComponentFile);
        
        // add subComponentFile to state
        const subComponentToAdd = subComponentFile;
        addToState(subComponentToAdd);
    }
}

function checkIfSubcomponentStateMatchInFile(subComponentState, componentFile, type) {
    const isMatch = componentFile[type+"s"].some(subComponentFile => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        console.info("Component has changed! REMOVED from State: ", subComponentState);

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
        console.info("Function has changed! : ", s_functionsInState);
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

function removeFromState(obj){
}

function addToState(obj){
}