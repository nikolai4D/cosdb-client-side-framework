import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { updateFunctionsDom } from "./updateFunctionsDom.mjs";
import { updateSubcomponentDom } from "./updateSubcomponentDom.mjs";


export async function updateComponentDom( { componentData, functions, parentComponentId}
) {

  const accordionBodyId = "accordion-body-" + parentComponentId;
  console.log(accordionBodyId, "accordionBodyId")
  console.log(componentData, "componentData")
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + parentComponentId + " deleted");
  }  
  // const updatedSlots = componentData.slots;

  // if (updatedSlots) {
  //   updatedDom = await updateSlotsDom(updatedSlots, components);
  // }
  // else {
    const updatedFunctions = componentData.functions;
    const updatedSubcomponents = componentData.subComponents;


    let updatedFunctionsDom = await updateFunctionsDom(updatedFunctions, functions);
    let updatedSubcomponentDom = await updateSubcomponentDom(updatedSubcomponents, functions);

    console.log(updatedDom);
    console.log(updatedSubcomponentDom);


  // }

 accordionBody.appendChild(updatedFunctionsDom);
 return accordionBody.appendChild(updatedSubcomponentDom);

}
