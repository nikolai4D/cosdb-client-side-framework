import { accordionInput } from "../types/accordionInput.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Slot(slot, component) {
  const SlotDiv = document.createElement("div");
  SlotDiv.classList.add(slot.customType);

  const customType = slot.customType;
  const key = slot.key;
  const value = slot.value;
  const id = slot.id;
  const parentId = slot.parentId;
  const valueDisabled = slot.valueDisabled;

  const bodyDiv = document.createElement("div");
  //const componentDiv = await Component(await newComponent(id));
  const componentDiv = await component;
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

  await mutation_updateState("slots", slot);

  return SlotDiv;
}
