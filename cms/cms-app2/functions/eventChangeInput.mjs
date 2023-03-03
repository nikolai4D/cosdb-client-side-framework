import { readModel } from "../requests/readModel.mjs";
import { updateField } from "../functions/updateField.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function eventChangeInput(id, value) {
  console.log("changed id: " + id + "with value: " + value);
  const modelJson = await readModel();
  const updatedModelJson = await updateField(modelJson, id, value);
  await writeModel(updatedModelJson);
}
