import { getUuid } from "../requests/getUuid.mjs";

export async function newSlot(key, value, parentId) {
  const slot = {};
  slot.customType = "slot";
  slot.key = key;
  slot.value = value;
  slot.id = await getUuid();
  slot.parentId = parentId;
  slot.valueDisabled = true;

  return slot;
}
