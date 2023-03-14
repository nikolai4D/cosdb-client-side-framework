import { Slot } from "./Slot.mjs";
import { newSlot } from "./newSlot.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
import { slotValues } from "./slotValues.mjs";

export async function createSlots(viewTemplateBody, id, viewTemplate) {
  const viewTemplateSlots = await slotValues(viewTemplate);
  //   const filename = viewTemplate;
  //   const constructorType = "slots";
  //   const type = "viewTemplates";
  //   const viewTemplateSlots = await getConstructors(
  //     filename,
  //     constructorType,
  //     type
  //   );

  const slots = [];

  for (const slot of viewTemplateSlots) {
    const [[key, value]] = Object.entries(slot);

    const slotKey = key;
    const slotValue = value;
    const slotParentId = id;

    const createdSlot = await newSlot(slotKey, slotValue, slotParentId);
    const component = await Component(await newComponent(id));
    const childSlot = await Slot(createdSlot, component);

    // const childSlot = await Slot(
    //     await newSlot(slotKey, slotValue, slotParentId)
    //   );

    viewTemplateBody.appendChild(childSlot);
    slots.push(createdSlot);
  }
  return slots;
}
