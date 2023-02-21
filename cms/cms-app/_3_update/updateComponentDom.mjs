import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { updateConstructorDom } from "./updateConstructorDom.mjs";


export async function updateComponentDom( { componentData, functions }
) {

  const accordionBodyId = "accordion-body-" + componentData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + componentData.id + " deleted");
  }  
  let updatedDom = null
  // const updatedSlots = componentData.slots;

  // if (updatedSlots) {
  //   updatedDom = await updateSlotsDom(updatedSlots, components);
  // }
  // else {
    const updatedFunctions = componentData.functions;

    updatedDom = await updateConstructorDom(updatedFunctions, functions);
    console.log(updatedDom);

  // }

  return accordionBody.appendChild(updatedDom);
}
