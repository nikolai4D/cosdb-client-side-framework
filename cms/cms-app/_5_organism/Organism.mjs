import { accordionInput } from "../types/accordionInput.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Organism(organism, organismBody) {
  const organismDiv = document.createElement("div");
  organismDiv.classList.add(organism.customType);

  const customType = organism.customType;
  const key = organism.key;
  const value = organism.value;
  const id = organism.id;
  const parentId = organism.parentId;
  const valueDisabled = organism.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contentDiv = await organismBody;
  bodyDiv.appendChild(contentDiv);

  const organismAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  organismDiv.appendChild(organismAccordionInput);

  await mutation_updateState("organisms", organism);

  return organismDiv;
}
