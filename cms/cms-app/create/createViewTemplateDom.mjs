// export async function createViewTemplateDom(viewTemplateData) {
//   console.log(viewTemplateData, "viewTemplateData");
//   const pElement = document.createElement("p");
//   pElement.textContent = "createViewTemplateDom";

//   return pElement;
// }

import { accordionDropdown } from "../types/accordionDropdown.mjs";
// import { Slots } from "./Slots.mjs";
import { readComponents } from "../requests/readComponents.mjs";

const type = "viewTemplates";

export async function createViewTemplateDom(viewTemplateData) {
  let components = (await readComponents(type)).map(
    (component) => component.name
  );
  console.log(components);
  components = ["", ...components];

  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");

  const selectedValue = viewTemplateData.option;
  const values = components;
  const key = "viewTemplate";
  const id = viewTemplateData.id;

  const pElement = document.createElement("p");
  pElement.textContent = "Slots for viewTemplate";

  const bodyDiv = document.createElement("div");
  bodyDiv.appendChild(pElement);

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
