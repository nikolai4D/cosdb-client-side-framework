import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { State } from "../data-mgmt/State.mjs";
import { readComponents } from "../requests/readComponents.mjs";
import { viewTemplateValues } from "../_2_viewTemplate/viewTemplateValues.mjs";


export async function updateModelIfHasChanged() {

    const readModel = await action_readModel();
    console.log(State)

    console.log("Hello!")

    const values = await viewTemplateValues();
    console.log(values, "values")


    for (const view of State.views) {
        // add viewTemplates from state
    
        const existingViewTemplate = State.viewTemplates.find(
          (viewTemplate) => viewTemplate.parentId === view.id
        );

        if (!values.includes(existingViewTemplate.value)){
            console.log("ViewTemplate has changed! : ", existingViewTemplate)
            continue
        }

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