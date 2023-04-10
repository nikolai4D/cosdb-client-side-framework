import { writeModel } from "../../requests/writeModel.mjs";

export async function action_writeModel(state) {
  const writtenModel = await writeModel(await state);

  return writtenModel;
}
