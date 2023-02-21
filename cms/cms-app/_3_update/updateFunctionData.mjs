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
  const functionData = existingFunction;
    functionData.option = newValue
    console.log(newValue);

    console.log(existingModel);

  const newModel = existingModel;

  await writeModel(newModel);
  return 

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
            if (slot.component.subComponents){
                slot.component.subComponents.forEach((subComponent) => {
                    if (subComponent.functions){
                    subComponent.functions.forEach((func) => {
                        if (func.id === functionId) {
                            existingFunction = func;
                            return;
                            }
                        })
                    }
                })
            }
            })
        }
    });
    }
  );
  return existingFunction;
}
