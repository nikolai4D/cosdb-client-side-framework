import { updateSlotsDom } from "./updateSlotsDom.mjs";

export async function updateComponentDom(componentData) {

  const accordionBodyId = "accordion-body-" + componentData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + componentData.id + " deleted");
  }  
  let updatedDom = null
  const updatedSlots = componentData.slots;

  if (updatedSlots) {
    updatedDom = await updateSlotsDom(updatedSlots, components);
  }

  return accordionBody.appendChild(updatedDom);
}
