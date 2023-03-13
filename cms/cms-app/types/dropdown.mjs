import { eventChangeDropdown } from "../functions/eventChangeDropdown.mjs";

export function dropdown(
  customType,
  key,
  values,
  value,
  id,
  parentId,
  valueDisabled
) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ": ";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = valueDisabled;
  selectEl.setAttribute("parentId", parentId);
  selectEl.setAttribute("customType", customType);
  selectEl.addEventListener("change", () => eventChangeDropdown(id));

  for (const val of values) {
    const optionElValue = document.createElement("option");
    optionElValue.value = val;
    optionElValue.selected = val === value;
    optionElValue.textContent = val;
    selectEl.appendChild(optionElValue);
  }

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(selectEl);

  return container;
}
