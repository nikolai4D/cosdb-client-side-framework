import { getUuid } from "../requests/getUuid.mjs";

export async function newSlot(key, values, value, parentId) {
  const slot = {};
  slot.customType = "slot";
  slot.key = key;
  slot.values = values;
  slot.value = value;
  slot.id = await getUuid();
  slot.parentId = parentId;
  slot.valueDisabled = false;

  return slot;
}
