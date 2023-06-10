import { eventChangeInput } from "../functions/eventChangeInput.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";
import { action_writeModel } from "../data-mgmt/actions/action_writeModel.mjs";

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
  inputEl.setAttribute("key", key);
  inputEl.setAttribute("parentId", parentId);
  inputEl.setAttribute("customType", customType);
  inputEl.addEventListener("change", () => eventChangeInput(id));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  if (customType === "view"){
    let viewObj = {
      customType,
      key,
      value,
      id,
      parentId,
      valueDisabled,
      protected: protectedView
    }
    container.appendChild(createProtectedCheckbox(id, viewObj))
    container.classList.add("view-container-input-div")
  }

  return container;
}

function createProtectedCheckbox(id, viewObj) {
  // Create base elements
  const protectedDiv = document.createElement("div");
  const protectedDivIcon = document.createElement("i");

  // Define class names
  const iconLocked = "bi-lock-fill";
  const iconUnlocked = "bi-unlock";

  // Setup div
  protectedDiv.classList.add("view-container-checkbox-div");

  // Setup icon
  protectedDivIcon.classList.add("bi", viewObj.protected ? iconLocked : iconUnlocked);

  // Add event listener to checkbox
  protectedDivIcon.addEventListener("click", async function(e) {
    // If the checkbox is checked and the user tries to uncheck

    if (viewObj.protected && !confirm(`Are you sure you want to unprotect the view "${viewObj.value}"?`)) {
      // Prevent the checkbox from being unchecked
      e.preventDefault();
    }
    if (protectedDivIcon.classList.contains(iconLocked)) {
      protectedDivIcon.classList.remove(iconLocked);
      protectedDivIcon.classList.add(iconUnlocked);
      viewObj.protected = false;
    }
    else {
      protectedDivIcon.classList.remove(iconUnlocked);
      protectedDivIcon.classList.add(iconLocked);
      viewObj.protected = true;
    }
    viewObj.updated = Date();

    await changeProtectedValue(viewObj);
  });

  // Append elements to the parent div
  protectedDiv.appendChild(protectedDivIcon);

  return protectedDiv;
}

async function changeProtectedValue(viewObj) {
  const state = await mutation_updateState("views", viewObj);
  await action_writeModel(state);
}
