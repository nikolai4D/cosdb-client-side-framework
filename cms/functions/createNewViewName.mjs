import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";
import { addBreak } from "./addBreak.mjs";

export function createNewViewName(keys, keyInput, existingContentContainer) {
  const createNewViewName = document.createElement("button");
  createNewViewName.textContent = "New View Name";
  createNewViewName.addEventListener("click", () => {
    const key = keyInput.value;
    if (keys.includes(key)) {
      alert(
        `A key with the title ${key} already exists. Please choose a different title.`
      );
      return;
    }

    inputField(key, "", existingContentContainer);
    addBreak(existingContentContainer);

    keyInput.remove();
    createNewViewName.remove();
  });
  existingContentContainer.appendChild(createNewViewName);
}
