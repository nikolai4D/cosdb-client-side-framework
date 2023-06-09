import { accordionInput } from "../types/accordionInput.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function View(view, viewTemplate) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add(view.customType);

  const customType = view.customType;
  const key = view.key;
  const value = view.value;
  const id = view.id;
  const parentId = view.parentId;
  const valueDisabled = view.valueDisabled;
  const protectedView = view.protected;
  console.log(view, "view")

  const bodyDiv = document.createElement("div");
  const viewTemplateDiv = await viewTemplate;
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled,
    protectedView
  );
  viewDiv.appendChild(viewAccordionInput);

  await mutation_updateState("views", view);

  return viewDiv;
}
