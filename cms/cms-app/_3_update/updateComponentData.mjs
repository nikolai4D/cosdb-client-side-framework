import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getSlots } from "../functions/getSlots.mjs";

export async function updateComponentData(slotId, newValue = "") {

  const existingModel = await readModel();

  let existingSlot = {}
  
  existingModel.views.forEach(
    (view) =>  {view.viewTemplate.slots.forEach((slot) => 
      {if (slot.id === slotId) {
        existingSlot = slot
        return
      }})}
  );

  console.log(existingSlot)

  // const existingComponent = existingSlot.find(
  //   (view) => view.Component.id === componentId
  // );

  // const slotData = existingSlot.viewTemplate;

  // slotData.option = newValue;
  // if (newValue !== "") {
  //   slotData.slots = await getSlots(newValue);
  // } else {
  //   slotData.slots = [];
  // }

  // existingSlot.viewTemplate = slotData;

  // const newModel = existingModel;

  // await writeModel(newModel);

  // return slotData;

}