
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";
import { getFunctions } from "../functions/getFunctions.mjs";

export async function updateSubcomponentData(slotId, newValue = "") {

    console.log({slotId, newValue})

//   const functions = await getFunctions();
//   console.log(functions, "functions");

//   const existingModel = await readModel();

//   let existingSlot = getExistingPart(existingModel, slotId);

//   console.log(existingSlot)

//   const componentData = existingSlot.component;


//   // const existingComponent = existingSlot.find(
//   //   (view) => view.Component.id === componentId
//   // );

//   // const slotData = existingSlot.viewTemplate;

//   componentData.option = newValue;

//   if (newValue !== "") {
//     componentData.functions = await getConstructors(newValue, "functions","organisms");
//     componentData.subComponents = await getConstructors(newValue, "subComponents","organisms");

//   } else {
//     componentData.functions = [];
//     componentData.subComponents = [];
//   }


//   const newModel = existingModel;

//   await writeModel(newModel);
//   componentData.id = slotId

//   return {componentData, functions};

}

function getExistingPart(existingModel, slotId) {
    let existingSlot = {};

    existingModel.views.forEach(
        (view) => {
            view.viewTemplate.slots.forEach((slot) => {
                if (slot.id === slotId) {
                    existingSlot = slot;
                    return;
                }
            });
        }
    );
    return existingSlot;
}
