import { importModuleFromFile } from "./importModuleFromFile.mjs";

export async function getConstructors(filename, constructorType, type) {
  const file = `${filename}.mjs`;
  const module = await importModuleFromFile(file, filename, type);
  console.log("HELLLOOOO",module);
  const constructors = module[constructorType];

  return constructors;
}
