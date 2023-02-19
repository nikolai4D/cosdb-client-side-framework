import { getUuid } from "../requests/getUuid.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function createViewData() {
  const viewData = {};
  viewData.id = await getUuid();
  viewData.view = "New View";
  viewData.viewTemplate = {};
  console.log(viewData, "viewData");

  const existingModel = await readModel();
  console.log(existingModel, "existingModel");

  const newModel = existingModel.views.push(viewData);

  console.log(newModel, "newModel");

  await writeModel(newModel);

  return viewData;
}
