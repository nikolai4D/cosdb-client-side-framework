import { State } from "../State.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function action_writeModel() {
  const writtenModel = await writeModel(State);
  console.log("writtenModel: ", writtenModel);
  return writtenModel;
}
