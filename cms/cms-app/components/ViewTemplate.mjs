import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { Slots } from "./Slots.mjs";
import { readComponents } from "../requests/readComponents.mjs";

const type = "viewTemplates"

export async function ViewTemplate(view) {

  const components = (await readComponents(type)).map(component => component.name)
  console.log(components)

  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");

  const selectedValue = view.viewTemplate;
  const values = components;
  const key = "viewTemplate";
  const id = view.viewTemplateId;

  const bodyDiv = document.createElement("div");
  bodyDiv.appendChild(await Slots(view.slots));

  const accordionDiv = accordionDropdown(
    bodyDiv,
    key,
    values,
    selectedValue,
    id,
    false
  );

  viewTemplateDiv.appendChild(accordionDiv);
  
  return viewTemplateDiv;
}
