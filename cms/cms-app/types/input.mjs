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

function createProtectedCheckbox(id, protectedView) {
  // Create base elements
  const protectedDiv = document.createElement("div");
  const protectedDivCheckbox = document.createElement("input");
  const protectedDivLabel = document.createElement("label");
  const protectedDivIcon = document.createElement("i");

  // Define class names
  const iconLocked = "bi-lock";
  const iconUnlocked = "bi-unlock";

  // Setup div
  protectedDiv.classList.add("view-container-checkbox-div");

  // Setup checkbox
  protectedDivCheckbox.type = "checkbox";
  protectedDivCheckbox.id = `protected-checkbox-${id}`;
  
  // Setup label
  protectedDivLabel.setAttribute("for", protectedDivCheckbox.id);

  // Setup icon
  protectedDivIcon.classList.add("bi", protectedView ? iconLocked : iconUnlocked);
  protectedDivCheckbox.checked = protectedView;

// Add event listener to checkbox
protectedDivCheckbox.addEventListener("change", (e) => {
  // If the checkbox is already checked and the user tries to uncheck
  if (!protectedDivCheckbox.checked && !confirm('Are you sure you want to uncheck this?')) {
    // Prevent the checkbox from being unchecked
    e.preventDefault();
  } else {
    // Update the icon class
    protectedDivIcon.classList.toggle(iconLocked, protectedDivCheckbox.checked);
    protectedDivIcon.classList.toggle(iconUnlocked, !protectedDivCheckbox.checked);
  }
});
  // Append elements to the parent div
  protectedDivLabel.appendChild(protectedDivIcon);
  protectedDiv.appendChild(protectedDivCheckbox);
  protectedDiv.appendChild(protectedDivLabel);

  return protectedDiv;
}