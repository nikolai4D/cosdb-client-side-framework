import { importModuleFromFile } from "./importModuleFromFile.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function getConstructors(filename, constructorType, type) {
  const file = `${filename}.mjs`;

  console.log(file, filename, type, "module")

  const module = await importModuleFromFile(file, filename, type);

  const constructors = module[constructorType]
  if (constructors){
    for (const constructor of constructors) {
      constructor.id = await getUuid();
      constructor.option = "";
    }
  }

  return constructors;
}
