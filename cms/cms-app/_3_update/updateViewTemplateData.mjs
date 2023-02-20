import { getUuid } from "../requests/getUuid.mjs";

export async function updateViewTemplatData(json, id, newValue) {
  const filename = `${newValue}.mjs`;
  const module = await importModuleFromFile(filename, newValue);
  const slots = module.slots;
  for (const slot of slots) {
    slot.id = await getUuid();
    slot.component = {};
  }
  console.log(slots);
  for (const view of json.views) {
    if (view.viewTemplate.id === id) {
      view.viewTemplate.option = newValue;
      view.viewTemplate.slots = slots;
      break;
    }
  }
  console.log(json, "json");
  return json;
}

async function importModuleFromFile(filename, newValue) {
  const module = await import(`../../../components/viewTemplates/${filename}`);
  return new module[newValue]();
}
