import { accordionInput } from "../types/accordionInput.mjs";
import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { updateSubcomponentData } from "./updateSubcomponentData.mjs";
import { getConstructors } from "../functions/getConstructors.mjs"; 
import { updateFunctionsDom } from "./updateFunctionsDom.mjs";
import { getFunctions } from "../functions/getFunctions.mjs";
import { readModel } from "../requests/readModel.mjs";

// import { Organisms } from "./Organisms.mjs";
// import { Molecules } from "./Molecules.mjs";
// import { Atoms } from "./Atoms.mjs";

export async function updateSubcomponentDom(subComponents, components) {
    console.log("updateSubcomponentDom", subComponents);

  const subComponentDiv = document.createElement("div");
  subComponentDiv.classList.add("subComponents");
  const existingModel = await readModel();

  const functions = await getFunctions();

  for await (const subComponent of subComponents) {

    const key = "Subcomponent";
    const id = subComponent.id;

    let value = subComponent.subComponent;
    let keyDisabled = true;
    let updatedFunctions = await getConstructors(value, "functions",value.split("_")[0].toLowerCase()+"s");
    let updatedFunctionsDom = await updateFunctionsDom(updatedFunctions, functions);
    let bodyDiv = updatedFunctionsDom
    const accordionDiv =  await accordionInput(bodyDiv, key, value, id, keyDisabled) 
    subComponentDiv.appendChild(accordionDiv);
  }


  const newModel = existingModel;

  await writeModel(newModel);

  return subComponentDiv;
}
function getExistingSubcomponent(existingModel, functionId) {
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
  