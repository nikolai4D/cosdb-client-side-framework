import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { updateConstructorDom } from "./updateFunctionDom.mjs";


export async function updateComponentDom( { componentData, functions }
) {

  const accordionBodyId = "accordion-body-" + componentData.id;
  console.log(accordionBodyId, "accordionBodyId")
  console.log(componentData, "componentData")
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + componentData.id + " deleted");
  }  
  // const updatedSlots = componentData.slots;

  // if (updatedSlots) {
  //   updatedDom = await updateSlotsDom(updatedSlots, components);
  // }
  // else {
    const updatedFunctions = componentData.functions;

    let updatedDom = await updateConstructorDom(updatedFunctions, functions);
    console.log(updatedDom);

  // }

  return accordionBody.appendChild(updatedDom);
}
