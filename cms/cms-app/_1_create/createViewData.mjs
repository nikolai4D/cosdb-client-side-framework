import { getUuid } from "../requests/getUuid.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function createViewData() {
  const viewData = {};
  viewData.id = await getUuid();
  viewData.view = "New View";
  viewData.viewTemplate = {};

  const existingModel = await readModel();

  existingModel.views.push(viewData);

  const newModel = existingModel;

  await writeModel(newModel);

  return viewData;
}
