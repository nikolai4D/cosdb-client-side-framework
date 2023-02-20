import { updateSlotsDom } from "./updateSlotsDom.mjs";

export async function updateViewTemplateDom(viewTemplateData) {
  const accordionBodyId = "accordion-body-" + viewTemplateData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + viewTemplateData.id + " deleted");
  }
  const updatedSlots = viewTemplateData.slots;
  const updatedSlotsDom = await updateSlotsDom(updatedSlots);

  return accordionBody.appendChild(updatedSlotsDom);
}
