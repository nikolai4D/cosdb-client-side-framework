// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";

export async function eventChangeDropdown(id) {
  const select = document.getElementById(id);
  const selectedValue = select.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  console.log("update: ", customType, ": ", {
    id,
    parentId,
    selectedValue,
  });

  if (customType === "viewTemplate") {
    const viewTemplateBody = document.getElementById("accordion-body-" + id);
    while (viewTemplateBody.firstChild) {
      viewTemplateBody.removeChild(viewTemplateBody.firstChild);
    }
    await createSlots(viewTemplateBody, id, selectedValue);
  }
}
