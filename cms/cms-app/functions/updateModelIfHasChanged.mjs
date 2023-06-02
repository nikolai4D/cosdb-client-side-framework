import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { readComponents } from "../requests/readComponents.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}

let isElementsAlsoInArray = (arr, target) => target.every(v => arr.includes(v));


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

            // if there is a new slot in the file (and not in the state)
                // do something

            // if there is a new slot in the state (and not in the file)
                // remove the slot and its children from the state and model.json
            // continue;
        }

        if (slotsInState.length !== slotsInFile.length){
            console.log("Slots have changed! : ", viewTemplateInState);
            // can not handle same slots atm in the actual file
            // continue;
        }

        // what if slots in the file are different from the slots in the state?
        // what if there are the same but the file has more of them?
        // what if there are the same but the state has more of them?


        for (const slot of slotsInState) {
            const componentInState = State.components.find(
                (component) => component.parentId === slot.id
            );

            if (componentInState == undefined) {
                console.log("No component! : ", componentInState);
                continue;
            }

            // check if components id is a parentId for an organism, molecule or an atom
            // if it is, check if the organism, molecule or atom still exists as a file
                // "!viewTemplateFiles.includes(viewTemplateInState.value))"
            // if it doesn't, alert

            const organismInState = State.organisms.find(
                (organism) => organism.parentId === componentInState.id
            );

            const moleculeInState = State.molecules.find(
                (molecule) => molecule.parentId === componentInState.id
            );

            const atomInState = State.atoms.find(
                (atom) => atom.parentId === componentInState.id
            );

            const componentFiles = await componentValues();


            // if matching component is an organism, check if there is an organism, molecule or atom in the state that has the matching component as a parent
            // if there is:
                // check if the organisms, molecules and atoms still exist as a file
                // if they don't, alert

                // check if there is a function in the State that has the organism/molecule/atom as a parent
                // if there is, check if the function still exists as a file
                    // if they don't, alert

                // then go through each sub-component one-by-one with this function again with the organism as the parent
                // also run if matching component is a molecule
                // also run if matching compontent is an atom

            if (organismInState) {
                if (!componentFiles.includes(organismInState.value)){
                    console.log("Organism has changed! : ", organismInState);
                    // continue;
                }
                await checkOrganismSubComponents(organismInState, componentFiles);
            }

            // if matching component is an molecule, check if there is a molecule or atom in the state that has the matching component as a parent
            // if there is:
                // check if the molecules and atoms still exist as a file
                // if they don't, alert
                // also run if matching compontent is an atom

                // then go through each sub-component one-by-one with this function again with the molecule as the componentInState

            if (moleculeInState) {
                if (!componentFiles.includes(moleculeInState.value)){
                    console.log("Molecule has changed! : ", moleculeInState);
                    // continue;
                }

                checkMoleculeSubComponents(moleculeInState, componentFiles);
            }

            // if matching component is an atom, check if the atom still exist as a file
                // if it don't, alert

            if (atomInState) {
                if (!componentFiles.includes(atomInState.value)){
                    console.log("Atom has changed! : ", atomInState);
                    // continue;
                }
                checkAtom(atomInState, componentFiles);
            }

    }


    // get the code structure
        // does the viewtemplate still exist?**
            // are the slots still the same?*

            // the component in the slot, 
                // does the component still exist?*

                    // if it's an organism,*
                        // are the organisms still the same?*
                        // are the molecules still the same?*
                        // are the atoms still the same?*

                    // if it's a molecule,*
                        // are the atoms still the same?*

                // are the functions still the same?*

 // ** if not, then remove
  // * if not, then remove and replace with new component

                // Read Model 
    // Change model

    }
}


async function checkOrganismSubComponents(organismInState, componentFiles){


    const filename = organismInState.value;
    console.log(filename, "filename")
    let type = "organisms";
    let constructorType = "organisms";

    const organisms = await getConstructors(
        filename,
        constructorType,
        type
    );

    console.log(organisms, "organisms1")

    // what if components in the file are different from the components in the state?
    // what if there are the same but the file has more of them?
    // what if there are the same but the state has more of them?


    // get organisms from State with the matching component as a parent
    const s_organismsInState = State.organisms.filter(
        (organism) => organism.parentId === organismInState.id
    );

    const s_moleculesInState = State.molecules.filter(
        (molecule) => molecule.parentId === organismInState.id
    );

    const s_atomsInState = State.atoms.filter(
        (atom) => atom.parentId === organismInState.id
    );

    console.log(organismInState, "organismInState")
    // get organisms from file with the matching component as a parent


    let areOrganismsFiles = isElementsAlsoInArray(componentFiles, s_organismsInState.map(organism => organism.value))
    let areMoleculesFiles = isElementsAlsoInArray(componentFiles, s_moleculesInState.map(organism => organism.value))
    let areAtomsFiles = isElementsAlsoInArray(componentFiles, s_atomsInState.map(organism => organism.value))

    checkSubFunction(organismInState)

    if (!areOrganismsFiles){
        console.log("Organisms has changed! : ", s_organismsInState);
    }
    
    if (!areMoleculesFiles){
        console.log("Molecules has changed! : ", s_moleculesInState);
    }
    
    if (!areAtomsFiles){
        console.log("Atom has changed! : ", s_atomsInState);
    }








    for (let organism of s_organismsInState) {
        await checkOrganismSubComponents(organism, componentFiles)
    }

    for (let molecule of s_moleculesInState) {
        await checkMoleculeSubComponents(molecule, componentFiles)
    }
    
    for (let atom of s_atomsInState) {
        await checkAtom(atom, componentFiles)
    }

}

async function checkMoleculeSubComponents(moleculeInState, componentFiles){

    checkSubFunction(moleculeInState)

    const s_moleculesInState = State.molecules.filter(
        (molecule) => molecule.parentId === moleculeInState.id
    );

    const s_atomsInState = State.atoms.filter(
        (atom) => atom.parentId === moleculeInState.id
    );
    
    let areMoleculesFiles = isElementsAlsoInArray(componentFiles, s_moleculesInState.map(organism => organism.value))
    let areAtomsFiles = isElementsAlsoInArray(componentFiles, s_atomsInState.map(organism => organism.value))

    if (!areMoleculesFiles){
        console.log("Molecules has changed! : ", s_moleculesInState);
    }

    if (!areAtomsFiles){
        console.log("Atom has changed! : ", s_atomsInState);
    }

    let filename = moleculeInState.value;
    let type = "molecules";
    let constructorType = "molecules";
    const molecules = await getConstructors(
        filename,
        constructorType,
        type
    );
    console.log(moleculeInState, "moleculesInState")
    console.log(molecules, filename, constructorType, type, "molecules1")

    for (let molecule of s_moleculesInState) {
        await checkMoleculeSubComponents(molecule, componentFiles)
    }
    
    for (let atom of s_atomsInState) {
        await checkAtom(atom, componentFiles)
    }
}

async function checkAtom(atomInState, componentFiles){
    let areAtomsFiles = isElementsAlsoInArray(componentFiles, [atomInState.value])

    if (!areAtomsFiles){
        console.log("Atom has changed! : ", atomInState);
    }

    let filename = atomInState.value;
    let type = "atoms";
    let constructorType = "atoms";
    
    console.log(filename, "filename")
    // console.log(atomInState, "atomInState")
    const atoms = await getConstructors(
        filename,
        constructorType,
        type
    );  
    console.log(atoms, "atoms1")

    checkSubFunction(atomInState)

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
