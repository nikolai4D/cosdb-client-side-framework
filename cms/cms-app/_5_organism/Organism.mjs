import { accordionInput } from "../types/accordionInput.mjs";
import { action } from "../State.mjs";


export async function Organism(organism, organismBody) {
  console.log("Organism");
  const organismDiv = document.createElement("div");
  organismDiv.classList.add(organism.customType);

  const customType = organism.customType;
  const key = organism.key;
  const value = organism.value;
  const id = organism.id;
  const parentId = organism.parentId;
  const valueDisabled = organism.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await organismBody;
  bodyDiv.appendChild(contenDiv);

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

  action.create(id, value, parentId, "organisms");

  return organismDiv;
}
