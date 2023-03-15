import { createViewButton } from "./cms-app/functions/createViewButton.mjs";
import { readExistingModel } from "./cms-app/functions/readExistingModel.mjs";

export async function cms_app() {
  await readExistingModel();
  await createViewButton();
}
