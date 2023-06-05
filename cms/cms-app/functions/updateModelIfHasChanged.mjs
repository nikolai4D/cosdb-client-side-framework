import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";


export async function updateModelIfHasChanged() {

    const readModel = await action_readModel();
    console.log(State)

    const viewTemplateFiles = await viewTemplateValues();

    // console.log(viewTemplateFiles, "values")

    for (const view of State.views) {
        console.log(view, "view")
        // add viewTemplates from state

        // get viewTemplate from state
        const viewTemplateInState = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        // if the viewTemplate doesn't exist, alert
        if (!viewTemplateFiles.includes(viewTemplateInState.value)){
            console.log("ViewTemplate has changed! : ", viewTemplateInState)
            // continue
        }

        // get slots from state with the viewTemplate as the parent
        const slotsInState = State.slots.filter(slot => slot.parentId === viewTemplateInState.id)
        
        // get slots from the viewTemplate file
        const slotsInFile = await slotValues(viewTemplateInState.value);

        let isSlotSame = sameMembers(slotsInState.map(slot=> slot.value), slotsInFile.map(slot=> slot.slot))

        // if the slots don't match, alert
        if (!isSlotSame){
            console.log("Slots have changed! : ", viewTemplateInState);

            const slotsToRemove = slotsInState.filter(slotState => !(slotsInFile.map(slotFile => slotFile.slot)).includes(slotState.value))
            const slotsToAdd = slotsInFile.filter(slotFile => !(slotsInState.map(slot=> slot.value)).includes(slotFile.slot))
        }

        if (slotsInState.length !== slotsInFile.length){
            console.log("Slots have changed! : ", viewTemplateInState);

            throw new Error("Length of slots in state and file are not the same!", slotsInState, slotsInFile)
        }

        for (const slot of slotsInState) {
            const componentPlaceInState = State.components.find(
                (component) => component.parentId === slot.id
            );

            if (!componentPlaceInState) {
                console.log("No component! : ", componentPlaceInState);
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
                    console.log("Component has changed! : ", componentInState);
                    
                    // remove componentInState from state
                    const componentToRemove = componentInState;
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
            console.log("Component has changed! : ", s_componentInState);

            // filter out the subcomponents that are not in the array
            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))

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
            console.log("Component has changed! : ", s_componentInState);
            const subComponentsToRemove = s_componentInState.filter(s_comp => !componentFiles.includes(s_comp.value))

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
        console.log("Atom has changed! : ", atomInState);

        const atomsToRemove = atomInState

    }

    checkSubFunction(atomInState)
}

function compareComponents(subComponentState, subComponentFile, type) {
    return `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`;
}


function checkIfSubcomponentFileMatchState(subComponentFile, subComponentsState, type){
    const isMatch = subComponentsState.some(subComponentState => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        console.log("Component has changed! ADD to state: ", subComponentFile);
        
        // add subComponentFile to state
        const subComponentToAdd = subComponentFile;

    }
}

function checkIfSubcomponentStateMatchInFile(subComponentState, componentFile, type) {
    const isMatch = componentFile[type+"s"].some(subComponentFile => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        console.log("Component has changed! REMOVE from State: ", subComponentState);

        // remove subComponentState from state
        const subComponentToRemove = subComponentState;
    }
}

async function checkSubFunction(parentInState) {
    const s_functionsInState = State.functions.filter(
        (func) => func.parentId === parentInState.id
    );

    const functionFiles = await functionValues();

    let areFunctionsFiles = isElementsAlsoInArray(functionFiles, s_functionsInState.map(func => func.value));

    if (!areFunctionsFiles) {
        console.log("Function has changed! : ", s_functionsInState);
        const functionsToRemove = s_functionsInState.filter(func => !functionFiles.includes(func.value))
    }
}

function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

const isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));

