import { createNewViewName } from "./createNewViewName.mjs";

export async function createNew(
  existingContentContainer,
  createNewContainer,
  keys
) {
  const createNew = document.createElement("button");
  createNew.textContent = "New View";
  createNew.addEventListener("click", () => {
    const keyInput = document.createElement("input");
    keyInput.setAttribute("placeholder", "View Name");
    keyInput.setAttribute("id", "newKeyInput");
    existingContentContainer.appendChild(keyInput);

    createNewViewName(keys, keyInput, existingContentContainer);
  });
  createNewContainer.appendChild(createNew);
}
