import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { getSlots } from "../functions/getSlots.mjs";

export async function updateViewTemplateData(viewTemplateId, newValue) {
  console.log(viewTemplateId, newValue, "viewTemplateId, newValue");

  const existingModel = await readModel();

  console.log(existingModel, "existingModel");
  const existingViewTemplate = existingModel.views.find(
    (view) => view.viewTemplate.id === viewTemplateId
  );
  console.log(existingViewTemplate, "existingViewTemplate");

  const viewTemplateData = existingViewTemplate.viewTemplate;

  console.log(viewTemplateData, "viewTemplateData");
  viewTemplateData.option = newValue;
  viewTemplateData.slots = await getSlots(newValue);

  existingViewTemplate.viewTemplate = viewTemplateData;

  const newModel = existingModel;

  await writeModel(newModel);

  return viewTemplateData;

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
