import { getConstructors } from "../functions/getConstructors.mjs";

export async function slotValues(viewTemplate) {
  const filename = viewTemplate;
  const constructorType = "slots";
  const type = "viewTemplates";
  const viewTemplateSlots = await getConstructors(
    filename,
    constructorType,
    type
  );

  return viewTemplateSlots;
}
