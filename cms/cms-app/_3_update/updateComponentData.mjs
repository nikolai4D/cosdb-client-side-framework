import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";
import { getFunctions } from "../functions/getFunctions.mjs";


export async function updateComponentData(slotId, newValue = "") {

  const functions = await getFunctions();

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
    componentData.subComponents = await getConstructors(newValue, "subComponents","organisms");

    for (let subComponent of componentData.subComponents) {
      updateComponentData(slotId, subComponent.subComponent)
    }

  } else {
    componentData.functions = [];
    componentData.subComponents = [];
  }


  const newModel = existingModel;

  await writeModel(newModel);
  componentData.id = slotId

  return {componentData, functions};

}