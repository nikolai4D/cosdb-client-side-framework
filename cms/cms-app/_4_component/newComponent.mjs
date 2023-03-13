import { getUuid } from "../requests/getUuid.mjs";
import { readComponents } from "../requests/readComponents.mjs";

export async function newComponent(parentId) {
  const component = {};

  const organismsDir = "Organisms";
  const moleculesDir = "Molecules";
  const atomsDir = "Atoms";

  let organisms = (await readComponents(organismsDir)).map(
    (component) => component.name
  );
  let molecules = (await readComponents(moleculesDir)).map(
    (component) => component.name
  );

  let atoms = (await readComponents(atomsDir)).map(
    (component) => component.name
  );

  const components = ["", ...organisms, ...molecules, ...atoms];

  component.customType = "component";
  component.key = component.customType;
  component.values = components;
  component.selectedValue = "";
  component.id = await getUuid();
  component.parentId = parentId;
  component.valueDisabled = false;

  return component;
}
