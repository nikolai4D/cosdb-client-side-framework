import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

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

  const componentData = existingSlot.component;


  // const existingComponent = existingSlot.find(
  //   (view) => view.Component.id === componentId
  // );

  // const slotData = existingSlot.viewTemplate;

  componentData.option = newValue;
  if (newValue !== "") {
    componentData.functions = await getConstructors(newValue, "functions","organisms");
  } else {
    componentData.functions = [];
  }

  console.log({ componentData})
  if (newValue !== "") {
    componentData.subComponents = await getConstructors(newValue, "subComponents","organisms");
  } else {
    componentData.subComponents = [];
  }

  console.log(existingModel, "existing model")
  // existingModel.views.forEach(
  //   (view) =>  {view.viewTemplate.slots.forEach((slot) => 
  //     {if (slot.id === slotId) {
  //       existingSlot = slot
  //       return
  //     }})}
  // );


  // existingSlot.viewTemplate = slotData;

  // const newModel = existingModel;

  // await writeModel(newModel);

  // return slotData;

}