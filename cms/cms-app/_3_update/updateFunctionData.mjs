import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";
import { getFunctions } from "../functions/getFunctions.mjs";
import { updateSubcomponentData } from "./updateSubcomponentData.mjs";
import { getUuid } from "../requests/getUuid.mjs";


export async function updateFunctionData(functionId, newValue="") {

  const existingModel = await readModel();
  let existingFunction = getExistingFunction(existingModel, functionId);
  console.log(existingFunction, functionId);

//   const componentData = existingSlot.component;
//   componentData.id =   await getUuid();
//   componentData.option = newValue;

//   if (newValue !== "") {
//     componentData.functions = await getConstructors(newValue, "functions",newValue.split("_")[0].toLowerCase()+"s");
//     componentData.subComponents = await getConstructors(newValue, "subComponents",newValue.split("_")[0].toLowerCase()+"s");

//     for (let subComponent of componentData.subComponents) {
//       updateSubcomponentData(slotId, subComponent)
//     }

//   } else {
//     componentData.functions = [];
//     componentData.subComponents = [];
//   }


//   const newModel = existingModel;

//   await writeModel(newModel);

//   return {componentData, functions, parentComponentId:slotId};

}

function getExistingFunction(existingModel, functionId) {
  let existingFunction = {};

  existingModel.views.forEach(
    (view) => {
      view.viewTemplate.slots.forEach((slot) => {
        if (slot.component.functions){
          slot.component.functions.forEach((func) => {
            if (func.id === functionId) {
                existingFunction = func;
                return;
            }
            }
          )
        }
    });
    }
  );
  return existingFunction;
}
