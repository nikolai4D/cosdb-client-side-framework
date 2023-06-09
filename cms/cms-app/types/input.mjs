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
  protectedDivIcon.classList.add("bi", viewObj.protected ? iconLocked : iconUnlocked);
  protectedDivCheckbox.checked = viewObj.protected;

  // Add event listener to checkbox
  protectedDivCheckbox.addEventListener("click", async function(e) {
    // If the checkbox is checked and the user tries to uncheck

    if (!this.checked && !confirm('Are you sure you want to uncheck this?')) {
      // Prevent the checkbox from being unchecked
      e.preventDefault();
    }
    await myFunction(this.checked, viewObj);
  });

protectedDivCheckbox.addEventListener("change", () => {
  // Update the icon class
  protectedDivIcon.classList.toggle(iconLocked, protectedDivCheckbox.checked);
  protectedDivIcon.classList.toggle(iconUnlocked, !protectedDivCheckbox.checked);
});

  // Append elements to the parent div
  protectedDivLabel.appendChild(protectedDivIcon);
  protectedDiv.appendChild(protectedDivCheckbox);
  protectedDiv.appendChild(protectedDivLabel);

  return protectedDiv;
}

async function myFunction(checked,viewObj) {
  if (checked) {
    console.log("Checkbox is checked");
    viewObj.protected = true;
  } else {
    console.log("Checkbox is unchecked");
    viewObj.protected = false;
  }
  // const state = await mutation_updateState(customTypeArray, data);
  // const state = await mutation_updateState("views", );
  console.log(viewObj)
  // await action_writeModel(state);
}
