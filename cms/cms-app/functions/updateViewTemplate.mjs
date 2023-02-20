export async function updateViewTemplate(json, id, newValue) {
  const filename = `${newValue}.mjs`;
  const module = await importModuleFromFile(filename, newValue);
  const slots = module.slots;
  console.log(module, module.slots);
  for (const view of json.views) {
    if (view.viewTemplate.id === id) {
      view.viewTemplate.option = newValue;
      view.slots = slots;
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
