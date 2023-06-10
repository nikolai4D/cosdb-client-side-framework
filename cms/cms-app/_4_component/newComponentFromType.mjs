import { getUuid } from "../requests/getUuid.mjs";

export async function newComponentFromType(key, value, parentId, type) {
  const comp = {};
  comp.customType = type;
  comp.key = key;
  comp.value = value;
  comp.id = await getUuid();
  comp.parentId = parentId;
  comp.valueDisabled = true;
  if(type === "function"){
    comp.parameters = "";
  }

  return comp;
}
