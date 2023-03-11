import { accordionInput } from "../types/accordionInput.mjs";
import { newViewTemplate } from "../_2_viewTemplate/newViewTemplate.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

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

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", async () => {
    await mutation_deleteState("views", id);
    viewDiv.remove();
  });
  viewDiv.appendChild(deleteButton);

  await mutation_updateState("views", view);

  return viewDiv;
}
