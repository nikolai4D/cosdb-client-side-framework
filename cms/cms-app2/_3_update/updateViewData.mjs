import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function updateViewData(newViewData) {
  let existingModel = await readModel();

  let existingViewData = existingModel.views.find(
    (v) => v.id === newViewData.id
  );

  existingViewData = newViewData;

  let newModel = existingModel;

  writeModel(newModel);
}
