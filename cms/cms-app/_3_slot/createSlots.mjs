import { Slot } from "./Slot.mjs";
import { newSlot } from "./newSlot.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
import { slotValues } from "./slotValues.mjs";

export async function createSlots(viewTemplateBody, id, viewTemplate) {
  const viewTemplateSlots = await slotValues(viewTemplate);
  const slots = [];

  for (const slot of viewTemplateSlots) {
    const [[key, value]] = Object.entries(slot);

    const slotKey = key;
    const slotValue = value;
    const slotParentId = id;

    const createdSlot = await newSlot(slotKey, slotValue, slotParentId);
    const component = await Component(await newComponent(createdSlot.id));
    const childSlot = await Slot(createdSlot, component);

    viewTemplateBody.appendChild(childSlot);
    slots.push(createdSlot);
  }
  return slots;
}
