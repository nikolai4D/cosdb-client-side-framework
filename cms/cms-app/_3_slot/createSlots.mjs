import { Slot } from "./Slot.mjs";
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

  viewTemplateSlots.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);

    const slotKey = key;
    const slotValues = [];
    const slotValue = value;
    const slotParentId = id;

    const newSlot = await Slot(
      await newSlot(slotKey, slotValues, slotValue, slotParentId)
    );

    viewTemplateBody.appendChild(newSlot);
  });
}
