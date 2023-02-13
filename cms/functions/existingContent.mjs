import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";
import { addBreak } from "./addBreak.mjs";

export async function existingContent(existingContentContainer, data) {
  for (const key in data) {
    inputField(key, data[key], existingContentContainer);
    deleteButton(key, existingContentContainer);
    addBreak(existingContentContainer);
  }
}
