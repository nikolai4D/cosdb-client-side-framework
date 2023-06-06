import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function getConstructors(filename, constructorType, type) {
  const file = `${filename}.mjs`;
  const module = await importModuleFromFile(file, filename, type);
  const constructors = module[constructorType];

  return constructors;
}
