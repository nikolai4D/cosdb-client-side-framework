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
    comp = await getAtom(compName, compParentId);
    console.log("atom comp from getComponent", comp);
  }
  //console.log("comp from getComponent", comp);

  //   const renderComponentArray = Array.from(comp);

  //   for (const child of renderComponentArray) {
  //     div.appendChild(child);
  //   }
  //   console.log("div from getComponent", div);
  div.appendChild(new comp.render());

  return div;
}
