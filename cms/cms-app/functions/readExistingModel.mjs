import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();
  console.log("readExistingModel: readModel:", readModel);

  // add views from state
  // add viewTemplates from state
  // add slots form state
  // add components from state
  // add organisms from state
  // add molecules from state
  // add atoms from state
  // add atomValues from state
  // add functions from state
}
