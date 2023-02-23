import { readModel } from "./readModel.mjs";
import { writeModel } from "./writeModel.mjs";


export async function updateModel(id, value, parentId="", type) {
    let existingModel = await readModel();
  
    console.log(existingModel, type);
  
      existingModel[type].push({
        id,
        value,
        parentId
      });
    let newModel = existingModel;
    await writeModel(newModel);
  }
    