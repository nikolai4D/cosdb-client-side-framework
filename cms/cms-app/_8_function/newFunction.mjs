import { getUuid } from "../requests/getUuid.mjs";
// import { readFunctions } from "../requests/readFunctions.mjs";

export async function newFunction(parentId) {
  const func = {};

  //   let components = (await readFunctions()).map(
  //     (component) => component.name
  //   );
  //   components = ["", ...components];

  func.customType = "function";
  func.key = func.customType;
  //   func.values = components;
  func.value = "";
  func.id = await getUuid();
  func.parentId = parentId;
  func.valueDisabled = false;

  return func;
}
