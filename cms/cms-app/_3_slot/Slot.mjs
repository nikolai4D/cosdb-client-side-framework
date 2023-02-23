import { accordionInput } from "../types/accordionInput.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { updateModel } from "../requests/updateModel.mjs";

export async function Slot(slot) {
  console.log("Slot");
  const SlotDiv = document.createElement("div");
  SlotDiv.classList.add(slot.customType);

  const customType = slot.customType;
  const key = slot.key;
  const value = slot.value;
  const id = slot.id;
  const parentId = slot.parentId;
  const valueDisabled = slot.valueDisabled;

  const bodyDiv = document.createElement("div");
  const componentDiv = await Component(await newComponent(parentId));
  bodyDiv.appendChild(componentDiv);

  const SlotAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  SlotDiv.appendChild(SlotAccordionInput);
  await updateModel(id, value, parentId, "slots");

  return SlotDiv;
}