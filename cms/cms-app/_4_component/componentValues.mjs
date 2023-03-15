import { readComponents } from "../requests/readComponents.mjs";

export async function componentValues() {
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

  return components;
}
