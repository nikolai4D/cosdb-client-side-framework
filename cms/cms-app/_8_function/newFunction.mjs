import { getUuid } from "../requests/getUuid.mjs";

export async function newFunction(parentId, fnKey) {
  const func = {};

  func.customType = "function";
  func.key = fnKey;
  func.value = "";
  func.id = await getUuid();
  func.parentId = parentId;
  func.valueDisabled = false;

  return func;
}
