import { readModel } from "../requests/readModel.mjs";
import { updateField } from "../functions/updateField.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export function dropdown(key, values, selectedValue, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = keyDisabled;
  //   selectEl.addEventListener("change", () => change(id, key));

  for (const value of values) {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.selected = value === selectedValue;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  }

  selectEl.addEventListener("change", () => change(id, key, optionEl.selected));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(selectEl);

  return container;
}

async function change(id, key, value) {
  if (key === "viewTemplate") {
    const accordionBodyId = "accordion-body-" + id;
    const accordionBody = document.getElementById(accordionBodyId);
    if (accordionBody) {
      while (accordionBody.firstChild) {
        accordionBody.removeChild(accordionBody.firstChild);
      }
      console.log("accordion-body-" + id + " deleted");
    }
  }
  console.log("changed " + key + ": " + id + "with value: " + value);
  const modelJson = await readModel();
  const updatedModelJson = await updateField(modelJson, id, value);
  await writeModel(updatedModelJson);
}
