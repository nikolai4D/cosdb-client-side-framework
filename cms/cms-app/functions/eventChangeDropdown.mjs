// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";

export async function eventChangeDropdown(e, id) {
  console.log(e, "e")
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

    if (selectedValue !== "") {
      await createSlots(viewTemplateBody, id, selectedValue);
    }
  }
  if (customType === "component") {
    if (selectedValue.startsWith("Organism")) {
      console.log("Organism");
    }
    if (selectedValue.startsWith("Molecule")) {
      console.log("Molecule");
    }
    if (selectedValue.startsWith("Atom")) {
      console.log("Atom");
    }
  }
}
