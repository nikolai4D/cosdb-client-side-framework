import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Atoms } from "./Atoms.mjs";

export function Molecules(molecules) {
  const moleculesDiv = document.createElement("div");
  moleculesDiv.classList.add("molecules");

  for (const mol of molecules) {
    const key = "molecule";
    const value = mol.molecule;
    const body = document.createElement("div");

    body.appendChild(Functions(mol.functions));
    body.appendChild(document.createElement("br"));
    body.appendChild(Atoms(mol.atoms));

    const accordionDiv = accordian(key, value, body, true);
    moleculesDiv.appendChild(accordionDiv);
  }

  return moleculesDiv;
}
