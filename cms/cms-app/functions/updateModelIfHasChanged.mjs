import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";
import { componentValues } from "../_4_component/componentValues.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { checkOrganismSubComponents, checkMoleculeSubComponents,checkAtom, addToState, removeFromState, sameMembers } from "./updateModelHelpers.mjs";

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

        if (viewTemplateInState === undefined) {
            continue
        }

        // if the viewTemplate doesn't exist, alert
        if (!viewTemplateFiles.includes(viewTemplateInState.value)){
            await removeFromState(viewTemplateInState);
            continue
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
                    continue;
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

    // console.log("State after update:", State) 

    await writeModel(State);
}