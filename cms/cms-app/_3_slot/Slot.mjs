import { accordionInput } from "../types/accordionInput.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";
import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { updateModel } from "../requests/updateModel.mjs";
import { action } from "../data-mgmt/State.mjs";

export async function Slot(slot) {
  const SlotDiv = document.createElement("div");
  SlotDiv.classList.add(slot.customType);

  const customType = slot.customType;
  const key = slot.key;
  const value = slot.value;
  const id = slot.id;
  const parentId = slot.parentId;
  const valueDisabled = slot.valueDisabled;

  const bodyDiv = document.createElement("div");
  const componentDiv = await Component(await newComponent(id));
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
  //action.create(id, value, parentId, "slots")

  // await updateModel(id, value, parentId, "slots");

  return SlotDiv;
}
