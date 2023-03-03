import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getSlots } from "../functions/getSlots.mjs";
import { getComponents } from "../functions/getComponents.mjs"

export async function updateViewTemplateData(viewTemplateId, newValue = "") {

  const componentsOrganism = await getComponents("organisms");
  const componentsMolecules = await getComponents("molecules");
  const componentsAtoms = await getComponents("atoms");

  const components = [...componentsOrganism, ...componentsMolecules, ...componentsAtoms]

  const existingModel = await readModel();

  const existingViewTemplate = existingModel.views.find(
    (view) => view.viewTemplate.id === viewTemplateId
  );

  const viewTemplateData = existingViewTemplate.viewTemplate;

  viewTemplateData.option = newValue;
  if (newValue !== "") {
    viewTemplateData.slots = await getSlots(newValue);
  } else {
    viewTemplateData.slots = [];
  }

  existingViewTemplate.viewTemplate = viewTemplateData;

  const newModel = existingModel;

  await writeModel(newModel);

  return {viewTemplateData, components}
  //   const file = `${filename}.mjs`;
  //   const module = await importModuleFromFile(file, filename);
  //   const slots = module.slots;
  //   for (const slot of slots) {
  //     slot.id = await getUuid();
  //     slot.component = {};
  //   }
  //   console.log(slots);

  //   for (const view of json.views) {
  //     if (view.viewTemplate.id === id) {
  //       view.viewTemplate.option = newValue;
  //       view.viewTemplate.slots = slots;
  //       break;
  //     }
  //   }
  //   console.log(json, "json");
  //   return json;
}

// async function importModuleFromFile(file, filename) {
//   const module = await import(`../../../components/viewTemplates/${file}`);
//   return new module[filename]();
// }

// async function getSlots(filename){
//     const file = `${filename}.mjs`;
//     const module = await importModuleFromFile(file, filename);
//     const slots = module.slots;
//     for (const slot of slots) {
//       slot.id = await getUuid();
//       slot.component = {};
//     }
//     console.log(slots);
//     return slots

// }
