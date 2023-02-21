import { importModuleFromFile } from "./importModuleFromFile.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function getConstructors(filename, constructorType, type) {
  const file = `${filename}.mjs`;

  console.log(file, filename, type, "module")

  const module = await importModuleFromFile(file, filename, type);
  console.log(module, "module")
  const constructors = module[constructorType]
  console.log(constructors, "constructors")

  if (constructors){
    for (const constructor of constructors) {
      constructor.id = await getUuid();
      constructor.option = "";
    }
  }

  return constructors;
}
