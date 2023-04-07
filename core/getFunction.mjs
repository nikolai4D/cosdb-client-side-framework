import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function getFunction(file) {
  const pathToFunc = `../../../data-mgmt/actions/${file}.mjs`;

  const Func = await importModuleFromFile(pathToFunc, file);

  const funcObject = Func[file];

  return funcObject;
}
