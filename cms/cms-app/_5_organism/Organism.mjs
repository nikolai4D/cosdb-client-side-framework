import { accordionInput } from "../types/accordionInput.mjs";
// import { Component } from "../_4_component/Component.mjs";
// import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";

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
  
  updateOrganismInModel(id, value, parentId)

  return organismDiv;
}

async function updateOrganismInModel(id, value, parentId) {
  let existingModel = await readModel();

  console.log(existingModel);

    existingModel.organisms.push({
      id,
      value,
      parentId
    });
  let newModel = existingModel;
  await writeModel(newModel);
}


