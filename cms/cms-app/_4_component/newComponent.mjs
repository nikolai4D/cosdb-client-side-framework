import { getUuid } from "../requests/getUuid.mjs";
import { readComponents } from "../requests/readComponents.mjs";

export async function newComponent(parentId) {
  const Component = {};

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

  components = ["", ...organisms, ...molecules, ...atoms];

  Component.customType = "Component";
  Component.key = Component.customType;
  Component.values = components;
  Component.selectedValue = "";
  Component.id = await getUuid();
  Component.parentId = parentId;
  Component.valueDisabled = false;

  return Component;
}
