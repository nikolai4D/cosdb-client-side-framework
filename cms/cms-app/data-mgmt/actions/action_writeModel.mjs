// import { State } from "../State.mjs";
import { writeModel } from "../../requests/writeModel.mjs";

export async function action_writeModel(state) {
  const writtenModel = await writeModel(state);
  console.log("writtenModel: ", writtenModel);
  return writtenModel;
}
