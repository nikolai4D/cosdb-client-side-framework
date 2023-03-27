import { importModuleFromFile } from "./importModuleFromFile.mjs";
export async function createComponent(type, file) {
  const pathToComponent = `../../../components/${type}s/${file}.mjs`;
  const Component = await importModuleFromFile(pathToComponent, file);
  const component = new Component[file]();
  return component;
}
