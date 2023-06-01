import { updateModelIfHasChanged } from "./functions/updateModelIfHasChanged.mjs";
import { readExistingModel } from "./functions/readExistingModel.mjs";
import { createViewButton } from "./functions/createViewButton.mjs";

export async function cms_app() {
  await updateModelIfHasChanged();
  await readExistingModel();
  await createViewButton();
}
