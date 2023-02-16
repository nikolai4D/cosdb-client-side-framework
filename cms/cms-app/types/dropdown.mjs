// import { readModel } from "../requests/readModel.mjs";
// import { writeModel } from "../requests/writeModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { updateViewTemplate } from "../functions/updateViewTemplate.mjs";
import { eventChangeDropdown } from "../functions/eventChangeDropdown.mjs";

export function dropdown(key, values, selectedValue, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = keyDisabled;
  selectEl.addEventListener("change", () => eventChangeDropdown(id, key));

  for (const value of values) {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.selected = value === selectedValue;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  }

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(selectEl);

  return container;
}

// async function eventChangeDropdown(id, key) {
//   const modelJson = await readModel();
//   console.log(modelJson);
//   const select = document.getElementById(id);
//   const selectedValue = select.value;

//   if (key === "viewTemplate") {
//     const updatedModelJson = await updateViewTemplate(
//       modelJson,
//       id,
//       selectedValue
//     );
//     await writeModel(updatedModelJson);
//     console.log("changed " + key + ": " + id + "with value: " + selectedValue);

//     const accordionBodyId = "accordion-body-" + id;
//     const accordionBody = document.getElementById(accordionBodyId);
//     if (accordionBody) {
//       while (accordionBody.firstChild) {
//         accordionBody.removeChild(accordionBody.firstChild);
//       }
//       console.log("accordion-body-" + id + " deleted");
//     }
//   } else {
//     const updatedModelJson = await updateField(modelJson, id, selectedValue);
//     await writeModel(updatedModelJson);
//     console.log("changed " + key + ": " + id + "with value: " + selectedValue);
//   }
// }

// async function updateViewTemplate(json, id, newValue) {
//   for (const view of json.views) {
//     if (view.viewTemplateId === id) {
//       view.viewTemplate = newValue;
//       view.slots = [];
//       break;
//     }
//   }
//   console.log();
//   return json;
// }
