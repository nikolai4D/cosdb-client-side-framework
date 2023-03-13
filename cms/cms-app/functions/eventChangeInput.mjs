import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";
import { action_writeModel } from "../data-mgmt/actions/action_writeModel.mjs";

export async function eventChangeInput(id) {
  const input = document.getElementById(id);
  const value = input.value;
  const customType = input.getAttribute("customType");
  const parentId = input.getAttribute("parentId");

  const data = {};
  data.id = id;
  data.parentId = parentId;
  data.value = value;
  data.key = customType;

  const customTypeArray = customType + "s";

  const state = await mutation_updateState(customTypeArray, data);

  await action_writeModel(state);
  console.log("updated input with state: ", state);
}
