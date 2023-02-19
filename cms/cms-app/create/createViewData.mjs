import { getUuid } from "../requests/getUuid.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function createViewData() {
  const viewData = {};
  viewData.id = await getUuid();
  viewData.view = "New View";
  viewData.viewTemplate = {};

  const existingModel = await readModel();
  const newModel = existingModel.views.push(viewData);

  console.log(newModel, "newModel");

  await writeModel(newModel);

  return viewData;
}
