import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { View } from "../_1_view/View.mjs";
import { State } from "../data-mgmt/State.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";
import { getAccordionBody } from "./getAccordionBody.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();
  console.log("readExistingModel: readModel:", readModel);

  // add views from state

  for (const view of State.views) {
    // add viewTemplates from state

    const existingViewTemplate = State.viewTemplates.find(
      (viewTemplate) => viewTemplate.parentId === view.id
    );

    console.log(
      "readExistingModel: existingViewTemplate:",
      existingViewTemplate
    );

    const ViewTemplateExistingDiv = await ViewTemplate(existingViewTemplate);

    const viewDiv = await View(view, ViewTemplateExistingDiv);
    document.body.appendChild(viewDiv);

    // add slots form state

    const viewTemplateBody = await getAccordionBody(id);
    await createSlots(viewTemplateBody, viewTemplate.id, viewTemplate.value);
  }

  // add components from state
  // add organisms from state
  // add molecules from state
  // add atoms from state
  // add atomValues from state
  // add functions from state
}
