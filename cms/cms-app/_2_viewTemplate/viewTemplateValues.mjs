import { readComponents } from "../requests/readComponents.mjs";

export async function viewTemplateValues() {
  const componentsDir = "viewTemplates";

  let components = (await readComponents(componentsDir)).map(
    (component) => component.name
  );
  components = ["", ...components];

  return components;
}
