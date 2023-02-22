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
    const viewTemplateBody = getElementById("accordion-body-" + id);
    await createSlots(viewTemplateBody, id, selectedValue);
  }
}
