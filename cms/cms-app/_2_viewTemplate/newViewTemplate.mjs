import { getUuid } from "../requests/getUuid.mjs";

export async function newViewTemplate(parentId) {
  const viewTemplate = {};

  viewTemplate.customType = "viewTemplate";
  viewTemplate.key = viewTemplate.customType;
  viewTemplate.value = "";
  viewTemplate.id = await getUuid();
  viewTemplate.parentId = parentId;
  viewTemplate.valueDisabled = false;

  return viewTemplate;
}
