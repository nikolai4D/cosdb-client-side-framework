import { Slot } from "./Slot.mjs";
import { newSlot } from "./newSlot.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createSlots(viewTemplateBody, id, selectedValue) {
  const filename = selectedValue;
  const constructorType = "slots";
  const type = "viewTemplates";
  const viewTemplateSlots = await getConstructors(
    filename,
    constructorType,
    type
  );

  console.log({ viewTemplateSlots })

  viewTemplateSlots.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);
    console.log({ key, value }})

    const slotKey = key;
    const slotValues = [];
    const slotValue = value;
    const slotParentId = id;

    const childSlot = await Slot(
      await newSlot(slotKey, slotValues, slotValue, slotParentId)
    );

    viewTemplateBody.appendChild(childSlot);
  });
}
