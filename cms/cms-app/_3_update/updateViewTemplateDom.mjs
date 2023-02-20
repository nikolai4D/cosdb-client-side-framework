import { Slots } from "../components/Slots.mjs";

export async function updateViewTemplateDom(viewTemplateData) {
  const accordionBodyId = "accordion-body-" + viewTemplateData.id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + viewTemplateData.id + " deleted");
  }
  const slots = viewTemplateData.slots;

  return await Slots(slots);
}
