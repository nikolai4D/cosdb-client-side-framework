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

      inputField(key, "", existingContentContainer);

      deleteButton(key, existingContentContainer);

      const br = document.createElement("br");
      existingContentContainer.appendChild(br);

      keyInput.remove();
      addKeyButton.remove();
    });
    existingContentContainer.appendChild(addKeyButton);
  });
  createNewContainer.appendChild(createNew);
}
