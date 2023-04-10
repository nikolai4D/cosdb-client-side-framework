import { getUuid } from "../requests/getUuid.mjs";

export async function newComponent(parentId) {
  const component = {};

  component.customType = "component";
  component.key = component.customType;
  component.value = "";
  component.id = await getUuid();
  component.parentId = parentId;
  component.valueDisabled = false;

  return component;
}
