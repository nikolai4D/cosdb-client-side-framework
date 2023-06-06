import { State } from "../data-mgmt/State.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { importModuleFromFile } from "./importModuleFromFile.mjs";
import {deleteChildren} from "./deleteChildren.mjs";
import {deleteItem} from "./deleteItem.mjs";
import { newComponentFromType } from "../_4_component/newComponentFromType.mjs";


export async function checkOrganismSubComponents(organismInState, componentFiles){
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
            continue
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

export function checkAndUpdateStateAndFile(s_componentInState, organismFile, comp, parentId) {
    for (let s_comp of s_componentInState) {
        checkIfSubcomponentStateMatchInFile(s_comp, organismFile, comp);
    }

    for (let s_comp of organismFile[comp + "s"]) {
        checkIfSubcomponentFileMatchState(s_comp, s_componentInState, comp, parentId);
    }
}

export async function checkMoleculeSubComponents(moleculeInState, componentFiles){
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
            continue
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

export async function getComponentFile(componentInState, type) {
    let filename = componentInState.value;
    let file = filename + ".mjs";

    const componentFile = await importModuleFromFile(
        file,
        filename,
        type
    );
    return componentFile;
}

export async function checkAtom(atomInState, componentFiles){
    let areAtomsFiles = componentFiles.includes(atomInState.value)

    if (!areAtomsFiles){
        removeFromState(atomInState);
    }

    checkSubFunction(atomInState)
}

export function compareComponents(subComponentState, subComponentFile, type) {
    return `${subComponentState.value} ${subComponentState.key}` === `${subComponentFile[type]} ${type} ${subComponentFile.id}`;
}


export function checkIfSubcomponentFileMatchState(subComponentFile, subComponentsState, type,parentId){
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

export function checkIfSubcomponentStateMatchInFile(subComponentState, componentFile, type) {
    const isMatch = componentFile[type+"s"].some(subComponentFile => compareComponents(subComponentState, subComponentFile, type));
    if (!isMatch) {
        // remove subComponentState from state
        const subComponentToRemove = subComponentState;
        removeFromState(subComponentToRemove);
    }
}

export async function checkSubFunction(parentInState) {
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
export function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

// This function checks if all target elements are also in the array
export const isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));


export async function removeFromState(obj){
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

export async function addToState(obj, parentId, isSlot = false){

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