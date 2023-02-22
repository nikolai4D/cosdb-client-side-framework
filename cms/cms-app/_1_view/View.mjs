import { accordionInput } from "../types/accordionInput.mjs";
// import { ViewTemplate } from "./ViewTemplate.mjs";

export async function View(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const customType = view.customType;
  const key = view.key;
  const value = view.value;
  const id = view.id;
  const parentId = view.parentId;
  const valueDisabled = view.valueDisabled;

  const bodyDiv = document.createElement("div");
  const viewTemplateDiv = {}; //await ViewTemplate(view);
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordionInput = accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );
  viewDiv.appendChild(viewAccordionInput);

  return viewDiv;
}
