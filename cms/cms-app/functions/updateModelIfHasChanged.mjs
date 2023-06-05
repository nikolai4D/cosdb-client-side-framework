import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function updateModelIfHasChanged() {
    const readModel = await action_readModel();
    const viewTemplateFiles = await viewTemplateValues();

    for (const view of State.views) {
        const viewTemplateInState = findInStateByParentId(State.viewTemplates, view.id);

        if (!viewTemplateFiles.includes(viewTemplateInState.value)) {
            console.log("ViewTemplate has changed! : ", viewTemplateInState);
        }

        const slotsInState = filterInStateByParentId(State.slots, viewTemplateInState.id);
        const slotsInFile = await slotValues(viewTemplateInState.value);
        const isSlotSame = sameMembers(slotsInState.map(slot => slot.value), slotsInFile.map(slot => slot.slot));

        if (!isSlotSame || slotsInState.length !== slotsInFile.length){
            console.log("Slots have changed! : ", viewTemplateInState);
        }

        for (const slot of slotsInState) {
            const componentPlaceInState = findInStateByParentId(State.components, slot.id);

            if (!componentPlaceInState) {
                console.log("No component! : ", componentPlaceInState);
                continue;
            }

            const componentFiles = await componentValues();
            const components = ["organisms", "molecules", "atoms"];

            for (const comp of components) {
                const componentInState = findInStateByParentId(State[comp], componentPlaceInState.id);
                if (componentInState && !componentFiles.includes(componentInState.value)) {
                    console.log("Component has changed! : ", componentInState);
                }
                await checkSubComponents(componentInState, componentFiles, comp);
            }
        }
    }
}

async function checkSubComponents(componentInState, componentFiles, comp){
    if (!componentInState) return;

    let filename = componentInState.value;
    let file = filename +".mjs";

    const componentFile = await importModuleFromFile(file, filename, comp);
    checkSubFunction(componentInState)

    const subComponents = [comp, comp === "organisms" ? "molecule" : "atom"];

    for (const subComp of subComponents) {
        const s_componentInState = filterInStateByParentId(State[subComp+"s"], componentInState.id);

        let areSubcompFiles = isElementsAlsoInArray(componentFiles, s_componentInState.map(s_comp => s_comp.value));

        if (!areSubcompFiles) console.log("Component has changed! : ", s_componentInState);

        if (componentFile[subComp+"s"] == undefined) componentFile[subComp+"s"] = [];

        for (let s_comp of s_componentInState) checkIfSubcomponentStateMatchInFile(s_comp, componentFile, subComp);

        for (let s_comp of componentFile[subComp+"s"]) checkIfSubcomponentFileMatchState(s_comp, s_componentInState, subComp);

        for (let subComponent of s_componentInState) await checkSubComponents(subComponent, componentFiles, subComp);
    }
}

async function checkSubFunction(parentInState) {
    const s_functionsInState = filterInStateByParentId(State.functions, parentInState.id);
    const functionFiles = await functionValues();

    if (!isElementsAlsoInArray(functionFiles, s_functionsInState.map(func => func.value))) {
        console.log("Function has changed! : ", s_functionsInState);
    }
}

function checkIfSubcomponentFileMatchState(subComponentFile, subComponentsState, type) {
    const isMatch = subComponentsState.some(subComponentState => `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`);
    if (!isMatch) console.log("Component has changed! ADD to state: ", subComponentFile);
}

function checkIfSubcomponentStateMatchInFile(subComponentState, componentFile, type) {
    const isMatch = componentFile[type+"s"].some(subComponentFile => `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`);
    if (!isMatch) console.log("Component has changed! REMOVE from State: ", subComponentState);
}

function findInStateByParentId(stateComponent, parentId) {
    return stateComponent.find(comp => comp.parentId === parentId);
}

function filterInStateByParentId(stateComponent, parentId) {
    return stateComponent.filter(comp => comp.parentId === parentId);
}

function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) && arr2.every(item => set1.has(item));
}

const isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));
