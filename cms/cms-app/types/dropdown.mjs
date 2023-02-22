import { eventChangeDropdown } from "../functions/eventChangeDropdown.mjs";

export function dropdown(
  customType,
  key,
  values,
  selectedValue,
  id,
  parentId,
  valueDisabled
) {
  console.log({ customType });
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ": ";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = valueDisabled;
  selectEl.setAttribute("parentId", parentId);
  selectEl.setAttribute("customType", customType);
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
