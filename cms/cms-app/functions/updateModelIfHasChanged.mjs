import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function updateModelIfHasChanged() {

    const readModel = await action_readModel();
    console.log(State)

    console.log("Hello!")

    for (const view of State.views) {
        // add viewTemplates from state
    
        const existingViewTemplate = State.viewTemplates.find(
          (viewTemplate, index) => viewTemplate.parentId === view.id
        );
        console.log(existingViewTemplate, "hello", index)
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