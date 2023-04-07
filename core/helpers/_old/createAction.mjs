import { importModuleFromFile } from "../importModuleFromFile.mjs";

export async function createAction(file) {
  const pathToAction = `../../../data-mgmt/actions/${file}.mjs`;

  const Action = await importModuleFromFile(pathToAction, file);

  const action = Action[file];

  return action;
}
