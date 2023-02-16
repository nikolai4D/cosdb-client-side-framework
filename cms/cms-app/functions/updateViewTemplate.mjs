export async function updateViewTemplate(json, id, newValue) {
  for (const view of json.views) {
    if (view.viewTemplateId === id) {
      view.viewTemplate = newValue;
      view.slots = [];
      break;
    }
  }
  console.log();
  return json;
}
