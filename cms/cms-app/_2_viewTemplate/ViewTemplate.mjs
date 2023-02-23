import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function ViewTemplate(viewTemplate) {
  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add(viewTemplate.customType);

  const customType = viewTemplate.customType;
  const key = viewTemplate.key;
  const values = viewTemplate.values;
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

  await updateViewTemplateInModel(id, value, parentId);

  return viewTemplateDiv;
}




async function updateViewTemplateInModel(id, value, parentId) {
  let existingModel = await readModel();

    existingModel.viewTemplates.push({
      id,
      value,
      parentId
    });
  let newModel = existingModel;
  await writeModel(newModel);
}

