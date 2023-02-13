import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";
import { addBreak } from "./addBreak.mjs";
import { createNewViewName } from "./createNewViewName.mjs";

export async function createNew(
  existingContentContainer,
  createNewContainer,
  keys
) {
  const createNew = document.createElement("button");
  createNew.textContent = "Create New View";
  createNew.addEventListener("click", () => {
    const keyInput = document.createElement("input");
    keyInput.setAttribute("placeholder", "Key");
    keyInput.setAttribute("id", "newKeyInput");
    existingContentContainer.appendChild(keyInput);

    // const createNewViewName = document.createElement("button");
    // createNewViewName.textContent = "Create New View";
    // createNewViewName.addEventListener("click", () => {
    //   const key = keyInput.value;
    //   if (keys.includes(key)) {
    //     alert(
    //       `A key with the title ${key} already exists. Please choose a different title.`
    //     );
    //     return;
    //   }

    //   inputField(key, "", existingContentContainer);
    //   deleteButton(key, existingContentContainer);
    //   addBreak(existingContentContainer);

    //   keyInput.remove();
    //   createNewViewName.remove();
    // });
    // existingContentContainer.appendChild(createNewViewName);

    createNewViewName(keys, keyInput, existingContentContainer);
  });
  createNewContainer.appendChild(createNew);
}
