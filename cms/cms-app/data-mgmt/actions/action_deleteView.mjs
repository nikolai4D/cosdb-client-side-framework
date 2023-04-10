import { State } from "../../data-mgmt/State.mjs";
import { deleteChildren } from "../../functions/deleteChildren.mjs";
import { deleteView } from "../../functions/deleteView.mjs";
import { action_writeModel } from "./action_writeModel.mjs";

export async function action_deleteView(id) {
  // delete view children from state

  await deleteChildren(id);

  // delete view from state

  await deleteView(id);

  // write state to model.json

  await action_writeModel(State);
}
