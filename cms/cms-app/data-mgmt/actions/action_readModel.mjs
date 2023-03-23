import { readModel } from "../../requests/readModel.mjs";
import { mutation_initializeState } from "../mutations/mutation_initializeState.mjs";

export async function action_readModel() {
  const model = await readModel();

  await mutation_initializeState(model);
}
