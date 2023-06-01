import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";

export async function updateModelIfHasChanged() {

    const readModel = await action_readModel();
    console.log(readModel)

    console.log("Hello!")

    // get the code structure
        // does the viewtemplate still exist?*
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

 // * if not, then remove and replace with new component
 
                // Read Model 
    // Change model


}