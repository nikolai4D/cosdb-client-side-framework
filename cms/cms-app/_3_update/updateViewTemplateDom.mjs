import { updateSlotsDom } from "./updateSlotsDom.mjs";
import { getComponents } from "../functions/getComponents.mjs"

export async function updateViewTemplateDom(viewTemplateData) {

  let components = await getComponents("organisms");
  const accordionBodyId = "accordion-body-" + viewTemplateData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + viewTemplateData.id + " deleted");
  }
  const updatedSlots = viewTemplateData.slots;
  const updatedSlotsDom = await updateSlotsDom(updatedSlots, components);

  return accordionBody.appendChild(updatedSlotsDom);
}
