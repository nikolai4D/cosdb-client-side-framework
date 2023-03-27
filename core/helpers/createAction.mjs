import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function createAction(parameters = null, file) {
  const pathToAction = `../../../data-mgmt/actions/${file}.mjs`;
  const Action = await importModuleFromFile(pathToAction, file);

  const action = new Action[file](parameters);

  return action;
}
