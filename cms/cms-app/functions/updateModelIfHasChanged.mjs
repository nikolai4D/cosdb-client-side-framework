import { State } from "../data-mgmt/State.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";
// import { checkSubcomponentFileMatchState, checkSubcomponentStateMatchInFile } from "./SubcomponentCheck.mjs"; 
// import { checkSubComponents, checkSubFunction, isElementsAlsoInArray, sameMembers } from "./ComponentHelper.mjs"; 

export async function updateModelIfHasChanged() {
    const viewTemplateFiles = await viewTemplateValues();

    for (const view of State.views) {
        // logic related to views
        // ...
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

            // if there is a new slot in the file (and not in the state)
                // do something

            // if there is a new slot in the state (and not in the file)
                // remove the slot and its children from the state and model.json
            // continue;
        }

        if (slotsInState.length !== slotsInFile.length){
            console.log("Slots have changed! : ", viewTemplateInState);
            // cannot handle same slots atm in the actual file
            // continue;
        }

        for (const slot of slotsInState) {
            // logic related to slots
            // ...
            const componentInState = State.components.find(
                (component) => component.parentId === slot.id
            );

            if (componentInState == undefined) {
                console.log("No component! : ", componentInState);
                continue;
            }

            const componentTypes = ['organisms', 'molecules', 'atoms'];
            for (const componentType of componentTypes) {
                const componentInState = State[componentType].find((component) => component.parentId === slot.id);

                if (componentInState) {
                    if (!componentFiles.includes(componentInState.value)){
                        console.log(`${componentType.slice(0, -1)} has changed! : `, componentInState);
                        continue;
                    }
                    await checkSubComponents(componentInState, componentFiles, componentType.slice(0, -1));
                }
            }
        }
    }
}

async function checkSubComponents(componentInState, componentFiles, componentType) {
    checkSubFunction(componentInState);

    const s_subComponentsInState = State[componentType + 's'].filter(
        (subComponent) => subComponent.parentId === componentInState.id
    );

    const filename = componentInState.value;
    const file = filename + ".mjs";

    const componentFile = await importModuleFromFile(
        file,
        filename,
        componentType + 's'
    );

    if (componentFile[componentType + 's'] == undefined) {
        componentFile[componentType + 's'] = [];
    }

    for (let subComponent of s_subComponentsInState) {
        checkSubcomponentStateMatchInFile(subComponent, componentFile, componentType);
    }

    for (let subComponent of componentFile[componentType + 's']) {
        checkSubcomponentFileMatchState(subComponent, s_subComponentsInState, componentType);
    }

    for (let subComponent of s_subComponentsInState) {
        await checkSubComponents(subComponent, componentFiles, componentType);
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
    }
}

function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

let isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));

export function checkSubcomponentStateMatchInFile(subComponent, componentFile, componentType) {
    if (!componentFile[componentType + 's'].some(sc => sc.id === subComponent.id)) {
        console.log(`${componentType.slice(0, -1)} removed from the file! : `, subComponent);
    }
}

export function checkSubcomponentFileMatchState(subComponent, s_subComponentsInState, componentType) {
    if (!s_subComponentsInState.some(sc => sc.id === subComponent.id)) {
        console.log(`${componentType.slice(0, -1)} added to the file! : `, subComponent);
    }
}