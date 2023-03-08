// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";
import { State, action } from "../data-mgmt/State.mjs";

export async function eventChangeInput(id) {
  const input = document.getElementById(id);
  const value = input.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  console.log("update: ", customType, ": ", { id, parentId, value });
  console.log({ State });
  //action.updateModel(State)
}
