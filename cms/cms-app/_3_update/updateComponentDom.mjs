import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { updateFunctionsDom } from "./updateFunctionsDom.mjs";


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

    let updatedFunctionsDom = await updateFunctionsDom(updatedFunctions, functions);
    let updatedSubcomponentsDom = await updateSubcomponentsDom(updatedFunctions, functions);

    console.log(updatedDom);
    console.log(updatedSubcomponentsDom);


  // }

 accordionBody.appendChild(updatedFunctionsDom);
 return accordionBody.appendChild(updatedSubcomponentsDom);

}
