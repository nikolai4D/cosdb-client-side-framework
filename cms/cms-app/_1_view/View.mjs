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


  let model = await readModel()

  // get view with same id 
  // replace the name with the new name
  // if there is none with that id, add it to views
  const existingView = model.views.find((view) => view.viewId === id);
  if (existingView) {
    existingView.name = value;
  }
  else {
    model.views.push({
      id: id,
      name: value,
      parentId: ""
    });
  }

  await writeModel(json);

  return viewDiv;
}
