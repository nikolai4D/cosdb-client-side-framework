import { getOrganism } from "./getOrganism.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getAtom } from "./getAtom.mjs";

export async function getComponent(compName, compParentId) {
  const div = document.createElement("div");
  div.classList.add("component");
  div.setAttribute("id", compParentId);
  let comp;

  if (compName.startsWith("Organism")) {
    comp = await getOrganism(compName, compParentId);
  }

  if (compName.startsWith("Molecule")) {
    comp = await getMolecule(compName, compParentId);
  }

  if (compName.startsWith("Atom")) {
    const getComp = await getAtom(compName, compParentId);
    const compValue = getComp.value;
    comp = getComp.comp;
    comp.value = [{ value: compValue[0].value }];
  }
  const renderComp = await comp.render();

  div.appendChild(renderComp);

  return div;
}
