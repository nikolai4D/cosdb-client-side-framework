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


  viewTemplateSlots.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);

    const slotKey = key;
    const slotValue = value;
    const slotParentId = id;

    const childSlot = await Slot(
      await newSlot(slotKey, slotValue, slotParentId)
    );

    viewTemplateBody.appendChild(childSlot);
  });
}
