import { eventChangeDropdown } from "../functions/eventChangeDropdown.mjs";

export function dropdown(key, values, selectedValue, id, keyDisabled = false, keyType) {
  console.log({keyType})
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = keyDisabled;
  selectEl.dataset.keyType = keyType 
  selectEl.addEventListener("change", () => eventChangeDropdown(id, key));


  // empty readonly option
  const optionEl = document.createElement("option");
  optionEl.value = "";
  optionEl.selected = true;
  selectEl.appendChild(optionEl);


  for (const value of values) {
    const optionElValue = document.createElement("option");
    optionElValue.value = value;
    optionElValue.selected = value === selectedValue;
    optionElValue.textContent = value;
    selectEl.appendChild(optionElValue);
  }

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(selectEl);

  return container;
}
