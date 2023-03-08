import { accordionInput } from "../types/accordionInput.mjs";
// import { Component } from "../_4_component/Component.mjs";
// import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";
// import { action } from "../data-mgmt/State.mjs";

export async function Atom(atom, atomBody) {
  console.log("atom");
  const atomDiv = document.createElement("div");
  atomDiv.classList.add(atom.customType);

  const customType = atom.customType;
  const key = atom.key;
  const value = atom.value;
  const id = atom.id;
  const parentId = atom.parentId;
  const valueDisabled = atom.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await atomBody;
  bodyDiv.appendChild(contenDiv);

  const atomAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  atomDiv.appendChild(atomAccordionInput);

  //action.create(id, value, parentId, "atoms");

  return atomDiv;
}
