import { writeModel } from "./writeModel.mjs";
import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";

export async function createNew(
  existingContentContainer,
  createNewContainer,
  keys
) {
  const createNew = document.createElement("button");
  createNew.textContent = "Add";
  createNew.addEventListener("click", () => {
    const keyInput = document.createElement("input");
    keyInput.setAttribute("placeholder", "Key");
    keyInput.setAttribute("id", "newKeyInput");
    existingContentContainer.appendChild(keyInput);

    const addKeyButton = document.createElement("button");
    addKeyButton.textContent = "Create New View";
    addKeyButton.addEventListener("click", () => {
      const key = keyInput.value;
      if (keys.includes(key)) {
        alert(
          `A key with the title ${key} already exists. Please choose a different title.`
        );
        return;
      }
      //   const label = document.createElement("label");
      //   label.textContent = key;
      //   existingContentContainer.appendChild(label);

      //   const input = document.createElement("input");
      //   input.setAttribute("id", key);
      //   input.setAttribute("value", "");
      //   input.addEventListener("change", writeModel);
      //   existingContentContainer.appendChild(input);

      inputField(key, "", existingContentContainer);

      //   const deleteButton = document.createElement("button");
      //   deleteButton.textContent = "x";
      //   deleteButton.addEventListener("click", () => {
      //     const confirmDelete = window.confirm(
      //       "Are you sure you want to delete?"
      //     );
      //     if (confirmDelete) {
      //       label.remove();
      //       input.remove();
      //       deleteButton.remove();
      //       writeModel();
      //       console.log("deleted from createNew");
      //     }
      //   });
      //   existingContentContainer.appendChild(deleteButton);

      deleteButton(existingContentContainer);

      const br = document.createElement("br");
      existingContentContainer.appendChild(br);

      keyInput.remove();
      addKeyButton.remove();
    });
    existingContentContainer.appendChild(addKeyButton);
  });
  createNewContainer.appendChild(createNew);
}
