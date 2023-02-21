import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { getComponents } from "../functions/getComponents.mjs"

export async function updateComponentDom(componentData) {

  // let components = await getComponents("organisms");
  const accordionBodyId = "accordion-body-" + componentData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + componentData.id + " deleted");
  }
  const updatedSlots = componentData.slots;
  const updatedSlotsDom = await updateSlotsDom(updatedSlots, components);

  return accordionBody.appendChild(updatedSlotsDom);
}
