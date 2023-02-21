import { importModuleFromFile } from "./importModuleFromFile.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function getConstructors(filename, constructorType) {
  const file = `${filename}.mjs`;
  const module = await importModuleFromFile(file, filename);
  const constructors = module[constructorType];
  for (const constructor of constructors) {
    constructor.id = await getUuid();
    constructor.option = "";
  }

  return constructors;
}
