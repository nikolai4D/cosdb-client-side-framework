import { accordionInput } from "../types/accordionInput.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";

export async function Organism(organism, organismBody) {
  console.log("Organism");
  const OrganismDiv = document.createElement("div");
  OrganismDiv.classList.add(organism.customType);

  const customType = organism.customType;
  const key = organism.key;
  const value = organism.value;
  const id = organism.id;
  const parentId = organism.parentId;
  const valueDisabled = organism.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await organismBody;
  bodyDiv.appendChild(contenDiv);

  const OrganismAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  OrganismDiv.appendChild(OrganismAccordionInput);

  return OrganismDiv;
}
