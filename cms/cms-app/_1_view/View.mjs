import { accordionInput } from "../types/accordionInput.mjs";
import { newViewTemplate } from "../_2_viewTemplate/newViewTemplate.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";


export async function View(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add(view.customType);

  const customType = view.customType;
  const key = view.key;
  const value = view.value;
  const id = view.id;
  const parentId = view.parentId;
  const valueDisabled = view.valueDisabled;

  const bodyDiv = document.createElement("div");
  const viewTemplateDiv = await ViewTemplate(await newViewTemplate(id));
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );
  viewDiv.appendChild(viewAccordionInput);

  let json= {}

  console.log(await readModel())
  return viewDiv;
}
