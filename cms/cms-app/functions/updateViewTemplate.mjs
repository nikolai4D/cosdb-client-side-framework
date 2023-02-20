export async function updateViewTemplate(json, id, newValue) {
  const filename = `${newValue}.mjs`;
  const module = await importModuleFromFile(filename, newValue);
  console.log(module, module.slots);
  for (const view of json.views) {
    if (view.viewTemplate.id === id) {
      view.viewTemplate.option = newValue;
      view.slots = [];
      break;
    }
  }
  console.log();
  return json;
}

async function importModuleFromFile(filename, newValue) {
  const module = await import(`../../../components/viewTemplates/${filename}`);
  return module[newValue]();
}
