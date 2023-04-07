import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function createAction(parameters = null, file) {
  console.log("createAction", parameters, file);
  const pathToAction = `../../../data-mgmt/actions/${file}.mjs`;
  console.log("pathToAction", pathToAction);
  const Action = await importModuleFromFile(pathToAction, file);
  console.log("Action", Action);

  const action = new Action[file]();
  console.log("action", action);

  return action;
}
