import { Slot } from "./Slot.mjs";
import { newSlot } from "./newSlot.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createSlots(viewTemplateBody, id, value) {
  const filename = value;
  const constructorType = "slots";
  const type = "viewTemplates";
  const viewTemplateSlots = await getConstructors(
    filename,
    constructorType,
    type
  );

  const slots = [];

  for (const slot of viewTemplateSlots) {
    const [[key, value]] = Object.entries(slot);

    const slotKey = key;
    const slotValue = value;
    const slotParentId = id;

    const createdSlot = await newSlot(slotKey, slotValue, slotParentId);
    const childSlot = await Slot(createdSlot);

    // const childSlot = await Slot(
    //     await newSlot(slotKey, slotValue, slotParentId)
    //   );

    viewTemplateBody.appendChild(childSlot);
    slots.push(createdSlot);
  }
  return slots;
}
