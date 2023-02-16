// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";
import { eventChangeInput } from "../functions/eventChangeInput.mjs";

export function input(key, value, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const inputEl = document.createElement("input");
  inputEl.value = value;
  inputEl.disabled = keyDisabled;
  inputEl.id = id;
  inputEl.addEventListener("change", () => eventChangeInput(id, inputEl.value));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  return container;
}

// async function eventChangeInput(id, value) {
//   console.log("changed id: " + id + "with value: " + value);
//   const modelJson = await readModel();
//   const updatedModelJson = await updateField(modelJson, id, value);
//   await writeModel(updatedModelJson);
// }
