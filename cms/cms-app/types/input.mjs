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
  const iconLocked = "bi-lock";
  const iconUnlocked = "bi-unlock";

  // Create and setup div
  const protectedDiv = document.createElement("div");
  protectedDiv.classList.add("view-container-checkbox-div");

  // Create and setup checkbox
  const protectedDivCheckbox = document.createElement("input");
  protectedDivCheckbox.type = "checkbox";
  protectedDivCheckbox.id = `protected-checkbox-${id}`;
  protectedDivCheckbox.checked = viewObj.protected;

  // Create and setup label
  const protectedDivLabel = document.createElement("label");
  protectedDivLabel.setAttribute("for", protectedDivCheckbox.id);

  // Create and setup icon
  const protectedDivIcon = document.createElement("i");
  protectedDivIcon.classList.add("bi", viewObj.protected ? iconLocked : iconUnlocked);

  protectedDivCheckbox.addEventListener("click", async (e) => {
    if (protectedDivCheckbox.checked && !confirm('Are you sure you want to uncheck this?')) {
      e.preventDefault();
    }
    await changeProtectedValue(protectedDivCheckbox.checked, viewObj);
  });

  protectedDivCheckbox.addEventListener("change", () => {
    protectedDivIcon.classList.toggle(iconLocked, protectedDivCheckbox.checked);
    protectedDivIcon.classList.toggle(iconUnlocked, !protectedDivCheckbox.checked);
  });

  protectedDivLabel.appendChild(protectedDivIcon);
  protectedDiv.appendChild(protectedDivCheckbox);
  protectedDiv.appendChild(protectedDivLabel);

  return protectedDiv;
}

async function changeProtectedValue(checked, viewObj) {
  viewObj.updated = Date();

  viewObj.protected = checked;

  const state = await mutation_updateState("views", viewObj);
  await action_writeModel(state);
}
