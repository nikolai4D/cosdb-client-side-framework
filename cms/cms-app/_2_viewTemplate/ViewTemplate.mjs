import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";
import { viewTemplateValues } from "./viewTemplateValues.mjs";

export async function ViewTemplate(viewTemplate) {
  console.log("ViewTemplate:", viewTemplate);
  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add(viewTemplate.customType);

  const customType = viewTemplate.customType;
  const key = viewTemplate.key;
  const values = await viewTemplateValues();
  const selectedValue = viewTemplate.selectedValue;
  const id = viewTemplate.id;
  const parentId = viewTemplate.parentId;
  const valueDisabled = viewTemplate.valueDisabled;

  const bodyDiv = document.createElement("div");
  const slotsDiv = document.createElement("div"); //await Slots(id);
  bodyDiv.appendChild(slotsDiv);

  const viewTemplateAccordionDropdown = await accordionDropdown(
    bodyDiv,
    customType,
    key,
    values,
    selectedValue,
    id,
    parentId,
    valueDisabled
  );

  viewTemplateDiv.appendChild(viewTemplateAccordionDropdown);

  await mutation_updateState("viewTemplates", viewTemplate);

  return viewTemplateDiv;
}
