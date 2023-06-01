import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { readComponents } from "../requests/readComponents.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";
import { slotValues } from "../_3_slot/slotValues.mjs";

function sameMembers(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(item => set2.has(item)) &&
        arr2.every(item => set1.has(item))
}


export async function updateModelIfHasChanged() {

    const readModel = await action_readModel();
    console.log(State)

    console.log("Hello!")

    const values = await viewTemplateValues();
    console.log(values, "values")


    for (const view of State.views) {
        // add viewTemplates from state

        // get viewTemplate from state
        const existingViewTemplate = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        // if the viewTemplate doesn't exist, alert
        if (!values.includes(existingViewTemplate.value)){
            console.log("ViewTemplate has changed! : ", existingViewTemplate)
            continue
        }

        // get slots from state with the viewTemplate as the parent
        const slotsInState = State.slots.filter(slot => slot.parentId === existingViewTemplate.id)
        
        // get slots from the viewTemplate file
        const viewTemplateSlots = await slotValues(existingViewTemplate.value);

        let isSlotSame = sameMembers(slotsInState.map(slot=> slot.value), viewTemplateSlots.map(slot=> slot.slot))
        
        console.log(isSlotSame, "isSlotSame")
        
        // if the slots don't match, alert
        if (slotsInState.length !== viewTemplateSlots.length){
            console.log("Slots have changed! : ", existingViewTemplate)
            continue
        }



        for (const slot of slotsInState) {
            const existingComponent = State.components.find(
                (component) => component.parentId === slot.id
            );
                
            if (!viewTemplateSlots.includes(existingComponent.value)){
                console.log("Component has changed! : ", existingComponent)
                continue
            }

            const componentSlots = await slotValues(existingComponent.value);
            console.log(componentSlots, "componentSlots")

            const slotsInState = State.slots.filter(slot => slot.parentId === existingComponent.id)


        // const viewTemplateBody = await getAccordionBody(existingViewTemplate.id);
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