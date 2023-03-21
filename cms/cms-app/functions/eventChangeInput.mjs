import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";
import { action_writeModel } from "../data-mgmt/actions/action_writeModel.mjs";

export async function eventChangeInput(id) {
  const input = document.getElementById(id);
  console.log({ input });
  let value = input.value;
  const customType = input.getAttribute("customType");
  const parentId = input.getAttribute("parentId");

  if (customType === "view") {
    value = value.toLowerCase().replace(/\s+/g, "");
    input.value = value;
  }

  const data = {};
  data.updated = Date();

  let customTypeArray;

  if (customType === "functionParameters") {
    const parentInput = document.getElementById(parentId);
    let parentValue = parentInput.value;
    const parentCustomType = parentInput.getAttribute("customType");
    const parentParentId = parentInput.getAttribute("parentId");
    const parentKey = parentInput.getAttribute("key");

    data.id = parentId;
    data.parentId = parentParentId;
    data.value = parentValue;
    data.key = parentKey;
    data.customType = parentCustomType;
    if (value.startsWith("{")) {
      value = JSON.parse(value);
      input.value = value;
    }
    data.parameters = value;

    customTypeArray = parentCustomType + "s";
  } else {
    data.id = id;
    data.parentId = parentId;
    data.value = value;
    data.key = customType;
    data.customType = customType;

    customTypeArray = customType + "s";
  }

  const state = await mutation_updateState(customTypeArray, data);
  console.log({ state });

  await action_writeModel(state);
}
