import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";
import { addBreak } from "./addBreak.mjs";

export async function existingViews(existingViewsContainer, data) {
  for (const key of data) {
    inputField(key, data[key], existingViewsContainer);
    deleteButton(key, existingViewsContainer);
    addBreak(existingViewsContainer);
  }
}
