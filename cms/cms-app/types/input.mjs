import { eventChangeInput } from "../functions/eventChangeInput.mjs";

export async function input(
  customType,
  key,
  value,
  id,
  parentId,
  valueDisabled = false,
  protectedView = false
) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ": ";

  const inputEl = document.createElement("input");
  inputEl.value = value;
  inputEl.disabled = valueDisabled;
  inputEl.id = id;
  inputEl.setAttribute("parentId", parentId);
  inputEl.setAttribute("customType", customType);
  inputEl.addEventListener("change", () => eventChangeInput(id));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  if (customType === "view"){
    container.appendChild(createProtectedCheckbox(id, protectedView))
    container.classList.add("view-container-input-div")
  }

  return container;
}

function createProtectedCheckbox(id, protectedView){
  const protectedDiv = document.createElement("div");  
  protectedDiv.classList.add("view-container-checkbox-div")
  const protectedDivCheckbox = document.createElement("input");
  protectedDivCheckbox.type = "checkbox"
  protectedDivCheckbox.id = "protected-checkbox-"+id

  const protectedDivLabel = document.createElement("label");
  protectedDivLabel.setAttribute("for", protectedDivCheckbox.id)
  const protectedDivIcon = document.createElement("i");

  // let icon = "Unprotected";
  protectedDivIcon.classList.add("bi")
  protectedDivIcon.classList.toggle("bi-cloud-plus")
  if (protectedView) {
    protectedDivCheckbox.checked = true;
    protectedDivIcon.classList.toggle("bi-cloud-plus-fill")
    // icon = "Protected";
  }
  protectedDivLabel.textContent = textContent;

  protectedDivCheckbox.addEventListener("change", () => {
    if (protectedDivCheckbox.checked) {
      protectedDivLabel.textContent = "Protected";
    } else {
      protectedDivLabel.textContent = "Unprotected";
    }
  })

  protectedDiv.appendChild(protectedDivCheckbox)
  protectedDiv.appendChild(protectedDivLabel)
  return protectedDiv
}