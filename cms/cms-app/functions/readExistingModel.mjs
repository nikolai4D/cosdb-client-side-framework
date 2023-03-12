import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { View } from "../_1_view/View.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();
  console.log("readExistingModel: readModel:", readModel);

  // add views from state

  for (const view of readModel.views) {
    const viewDiv = await View(view);
    document.body.appendChild(viewDiv);
  }

  // add viewTemplates from state
  // add slots form state
  // add components from state
  // add organisms from state
  // add molecules from state
  // add atoms from state
  // add atomValues from state
  // add functions from state
}
