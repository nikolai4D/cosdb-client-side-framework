import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { createAction } from "./helpers.mjs";
import { createAction } from "./helpers/createAction.mjs";

export async function getFunction(module, parentId) {
  const modelFunction = await apiCallGet(`/read/functions`);

  const func = modelFunction.filter((fn) => fn.parentId === parentId);
  const parameters = func.parameters;

  const funcObject = await createAction(parameters, module);

  return funcObject;
}
