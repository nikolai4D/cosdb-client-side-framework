// import { State } from "../State.mjs";
import { writeModel } from "../../requests/writeModel.mjs";

export async function action_writeModel(state) {
  console.log("writeModel State: ", state);
  const writtenModel = await writeModel(await state);
  console.log("writtenModel: ", writtenModel);
  return writtenModel;
}
