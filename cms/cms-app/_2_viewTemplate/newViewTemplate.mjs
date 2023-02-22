import { getUuid } from "../requests/getUuid.mjs";
import { readComponents } from "../requests/readComponents.mjs";

export async function newViewTemplate(parentId) {
  const viewTemplate = {};

  const componentsDir = "viewTemplates";

  let components = (await readComponents(componentsDir)).map(
    (component) => component.name
  );
  components = ["", ...components];

  viewTemplate.customType = "viewTemplate";
  viewTemplate.key = customType;
  viewTemplate.values = components;
  viewTemplate.selectedValue = "";
  viewTemplate.id = await getUuid();
  viewTemplate.parentId = parentId;
  viewTemplate.valueDisabled = false;

  return viewTemplate;
}
