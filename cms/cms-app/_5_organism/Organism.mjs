import { accordionInput } from "../types/accordionInput.mjs";
// import { Component } from "../_4_component/Component.mjs";
// import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";
import { updateModel } from "../requests/updateModel.mjs";


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

  await updateModel(id, value, parentId, "orgamisms");

  return organismDiv;
}
