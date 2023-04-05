import { getOrganism } from "./getOrganism.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getAtom } from "./getAtom.mjs";

export async function getComponent(compName, compParentId) {
  const div = document.createElement("div");
  div.classList.add("component");
  div.setAttribute("id", compParentId);
  let comp;

  if (compName.startsWith("Organism")) {
    const getComp = await getOrganism(compName, compParentId);
    const compChildOrganisms = getComp.organisms;
    const compMolecules = getComp.molecules;
    const compFunctions = getComp.functions;
    comp = getComp.comp;
    comp.organisms = compChildOrganisms;
    comp.molecules = compMolecules;
    comp.functions = compFunctions;
  }

  if (compName.startsWith("Molecule")) {
    const getComp = await getMolecule(compName, compParentId);
    const compAtoms = getComp.atoms;
    const compFunctions = getComp.functions;
    comp = getComp.comp;
    comp.atoms = compAtoms;
    comp.functions = compFunctions;
  }

  if (compName.startsWith("Atom")) {
    const getComp = await getAtom(compName, compParentId);
    const compValue = getComp.value;
    comp = getComp.comp;
    comp.value = [{ value: compValue[0].value }];
  }
  console.log(comp);
  const renderComp = await comp.render();

  div.appendChild(renderComp);

  return div;
}
