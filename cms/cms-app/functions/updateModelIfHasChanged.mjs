import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { readComponents } from "../requests/readComponents.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { functionValues } from "../_8_function/functionValues.mjs";

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

    console.log(viewTemplateFiles, "values")

    for (const view of State.views) {
        // add viewTemplates from state

        // get viewTemplate from state
        const viewTemplateInState = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        // if the viewTemplate doesn't exist, alert
        if (!viewTemplateFiles.includes(viewTemplateInState.value)){
            console.log("ViewTemplate has changed! : ", viewTemplateInState)
            continue
        }

        // get slots from state with the viewTemplate as the parent
        const slotsInState = State.slots.filter(slot => slot.parentId === viewTemplateInState.id)
        
        // get slots from the viewTemplate file
        const slotsInFile = await slotValues(viewTemplateInState.value);

        let isSlotSame = sameMembers(slotsInState.map(slot=> slot.value), slotsInFile.map(slot=> slot.slot))

        // if the slots don't match, alert
        if (!isSlotSame){
            console.log("Slots have changed! : ", viewTemplateInState);
            continue;
        }

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

            const organismsInState = State.organisms.find(
                (organism) => organism.parentId === componentInState.id
            );

            const moleculesInState = State.molecules.find(
                (molecule) => molecule.parentId === componentInState.id
            );

            const atomsInState = State.atoms.find(
                (atom) => atom.parentId === componentInState.id
            );

            const componentFiles = await componentValues();

            if (!componentFiles.includes(organismsInState.value)){
                console.log("Organism has changed! : ", organismsInState);
                continue;
            }

            if (!componentFiles.includes(moleculesInState.value)){
                console.log("Molecule has changed! : ", moleculesInState);
                continue;
            }

            if (!componentFiles.includes(atomsInState.value)){
                console.log("Atom has changed! : ", atomsInState);
                continue;
            }


            // check if there is a function in the State that has the organism/molecule/atom as a parent
            // if there is, check if the function still exists as a file
                // if they don't, alert

            // if matching component is an organism, check if there is an organism, molecule or atom in the state that has the matching component as a parent
            // if there is:
                // check if the organisms, molecules and atoms still exist as a file
                // if they don't, alert

                // check if there is a function in the State that has the organism/molecule/atom as a parent
                // if there is, check if the function still exists as a file
                    // if they don't, alert

                // then go through each sub-component one-by-one with this function again with the organism as the componentInState
                // also run if matching component is a molecule
                // also run if matching compontent is an atom

            if (organismsInState) {
                const s_organismsInState = State.organisms.filter(
                    (organism) => organism.parentId === organismsInState.id
                );
    
                const s_moleculesInState = State.molecules.filter(
                    (molecule) => molecule.parentId === organismsInState.id
                );
            
                const s_atomsInState = State.atoms.filter(
                    (atom) => atom.parentId === organismsInState.id
                );

                let areOrganismsFiles = isElementsAlsoInArray(componentFiles, s_organismsInState.map(organism => organism.value))
                let areMoleculesFiles = isElementsAlsoInArray(componentFiles, s_moleculesInState.map(organism => organism.value))
                let areAtomsFiles = isElementsAlsoInArray(componentFiles, s_atomsInState.map(organism => organism.value))

                if (!areOrganismsFiles){
                    console.log("Organisms has changed! : ", s_organismsInState);
                    continue;
                }
                
                if (!areMoleculesFiles){
                    console.log("Molecules has changed! : ", s_moleculesInState);
                    continue;
                }
                
                if (!areAtomsFiles){
                    console.log("Atom has changed! : ", s_atomsInState);
                    continue;
                }

                // functions

                const s_functionsInState = State.functions.filter(
                    (func) => func.parentId === organismsInState.id
                );

                const functionFiles = await functionValues();

                let areFunctionsFiles = isElementsAlsoInArray(functionFiles, s_functionsInState.map(func => func.value))

                if (!areFunctionsFiles){
                    console.log("Function has changed! : ", s_functionsInState);
                    continue;
                }
            }

            // if matching component is an molecule, check if there is a molecule or atom in the state that has the matching component as a parent
            // if there is:
                // check if the molecules and atoms still exist as a file
                // if they don't, alert
                // also run if matching compontent is an atom

                // then go through each sub-component one-by-one with this function again with the molecule as the componentInState

            // if matching component is an atom, check if the atom still exist as a file
                // if it don't, alert


            console.log(componentInState, "componentInState")

            const componentInFiles = await componentValues();
            console.log(componentInFiles, "componentInFiles")


            // const slotsInState = State.slots.filter(slot => slot.parentId === existingComponent.id)


        // const viewTemplateBody = await getAccordionBody(viewTemplateInState.id);
    }

    const componentsDir = "viewTemplates";

    let components = await readComponents(componentsDir)
    console.log(components, "components")


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