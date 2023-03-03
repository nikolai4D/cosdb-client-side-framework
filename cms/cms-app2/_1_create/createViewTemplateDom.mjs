import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { getComponents } from "../functions/getComponents.mjs";

const type = "viewTemplates";

export async function createViewTemplateDom(viewTemplateData) {

  let components = await getComponents(type);

  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");

  const selectedValue = viewTemplateData.option;
  const values = components;
  const key = "viewTemplate";
  const id = viewTemplateData.id;

  //   const pElement = document.createElement("p");

  const bodyDiv = document.createElement("div");
  //   bodyDiv.appendChild(pElement);

  const accordionDiv = await accordionDropdown(
    bodyDiv,
    key,
    values,
    selectedValue,
    id,
    false,
    "viewTemplate"
  );

  viewTemplateDiv.appendChild(await accordionDiv);

  return viewTemplateDiv;
}
