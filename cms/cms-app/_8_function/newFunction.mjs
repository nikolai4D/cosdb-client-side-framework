import { getUuid } from "../requests/getUuid.mjs";

export async function newFunction(parentId, fnKey, fnValue = "") {
  const func = {};

  func.customType = "function";
  func.key = fnKey;
  func.value = fnValue;
  func.id = await getUuid();
  func.parentId = parentId;
  func.valueDisabled = true;
  func.parameters = "";

  return func;
}
