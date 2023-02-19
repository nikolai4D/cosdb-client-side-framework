import { getUuid } from "../requests/getUuid.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function createViewTemplateData(viewId) {
  const viewTemplateData = {};
  viewTemplateData.id = await getUuid();
  viewTemplateData.option = "";
  viewTemplateData.slots = [];

  const existingModel = await readModel();
  console.log(existingModel.views, "existingModel.views");
  const newModel = existingModel.views.find((view) => view.id === viewId);
  console.log(newModel, "newModel");

  newModel.viewTemplate = viewTemplateData;

  await writeModel(newModel);

  return viewTemplateData;
}
