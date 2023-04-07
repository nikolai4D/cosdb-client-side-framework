import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { createAction } from "./helpers.mjs";
import { createAction } from "./helpers/createAction.mjs";

export async function getFunction(module, parentId) {
  console.log("getFunction", module, parentId);
  const modelFunction = await apiCallGet(`/read/functions`);
  console.log("modelFunction", modelFunction);

  const func = modelFunction.filter((fn) => fn.parentId === parentId);
  const parameters = func.parameters;

  const funcObject = await createAction(parameters, module);
  console.log(funcObject);

  return funcObject;
}
