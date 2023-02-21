import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getSlots } from "../functions/getSlots.mjs";

export async function updateComponentData(slotId, newValue = "") {

  const existingModel = await readModel();

  const existingViewTemplate = existingModel.views.find(
    (view) =>  view.viewTemplate.slots.find((slot) => slot.id === slotId)
  );

  // const existingComponent = existingViewTemplate.find(
  //   (view) => view.Component.id === componentId
  // );

  const viewTemplateData = existingViewTemplate.viewTemplate;

  viewTemplateData.option = newValue;
  if (newValue !== "") {
    viewTemplateData.slots = await getSlots(newValue);
  } else {
    viewTemplateData.slots = [];
  }

  existingViewTemplate.viewTemplate = viewTemplateData;

  const newModel = existingModel;

  await writeModel(newModel);

  return viewTemplateData;

}