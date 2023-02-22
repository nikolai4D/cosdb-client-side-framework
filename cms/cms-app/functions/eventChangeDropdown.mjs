// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";

export async function eventChangeDropdown(customType, key, id, parentId) {
  const select = document.getElementById(id);
  const selectedValue = select.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  console.log("update: ", customType, ": ", { id, parentId, selectedValue });
}
