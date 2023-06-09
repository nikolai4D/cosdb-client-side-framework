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
  selectEl.setAttribute("key", key);
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
  if (customType === "view"){
    container.appendChild(createProtectedCheckbox(id))
  }
  return container;
}


function createProtectedCheckbox(id){
  const protectedDiv = document.createElement("div");  
  const protectedDivCheckbox = document.createElement("input");
  protectedDivCheckbox.type = "checkbox"
  protectedDivCheckbox.id = "protected-checkbox-"+id

  const protectedDivLabel = document.createElement("label");
  protectedDivCheckbox.value = "Protected"
  protectedDivCheckbox.for = protectedDivCheckbox.id

  protectedDiv.appendChild(protectedDivCheckbox)
  protectedDiv.appendChild(protectedDivCheckbox)
  return protectedDiv
}