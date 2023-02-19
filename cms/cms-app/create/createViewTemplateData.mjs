import { getUuid } from "../requests/getUuid.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function createViewTemplateData(viewId) {
  const viewTemplateData = {};
  viewTemplateData.id = await getUuid();
  viewTemplateData.option = "";
  viewTemplateData.slots = [];

  const existingModel = await readModel();
  console.log(existingModel, "existingModel.views");
  const existingView = existingModel.views.find((view) => view.id === viewId);
  console.log(existingView, "existingView");

  existingView.viewTemplate = viewTemplateData;

  const newModel = existingModel;

  await writeModel(newModel);

  return viewTemplateData;
}
