import { createViewButton } from "./functions/createViewButton.mjs";
import { readExistingModel } from "./functions/readExistingModel.mjs";

export async function cms_app() {
  await readExistingModel();
  await createViewButton();
}
