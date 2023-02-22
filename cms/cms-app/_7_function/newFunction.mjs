import { getUuid } from "../requests/getUuid.mjs";
import { readComponents } from "../requests/readComponents.mjs";

export async function newFunction(parentId) {
  const func = {};

  const componentsDir = "functions";

  let components = (await readComponents(componentsDir)).map(
    (component) => component.name
  );
  components = ["", ...components];

  func.customType = "function";
  func.key = func.customType;
  func.values = components;
  func.selectedValue = "";
  func.id = await getUuid();
  func.parentId = parentId;
  func.valueDisabled = false;

  return func;
}
