import { accordianInput } from "./types/accordianInput.mjs";
import { Functions } from "./Functions.mjs";
import { Atoms } from "./Atoms.mjs";

export function Molecules(molecules) {
  const moleculesDiv = document.createElement("div");
  moleculesDiv.classList.add("molecules");

  for (const mol of molecules) {
    const key = "molecule";
    const value = mol.molecule;
    const id = mol.moleculeId;

    const bodyDiv = document.createElement("div");

    bodyDiv.appendChild(Functions(mol.functions));
    bodyDiv.appendChild(document.createElement("br"));
    bodyDiv.appendChild(Atoms(mol.atoms));

    const accordionDiv = accordianInput(bodyDiv, key, value, id, true);
    moleculesDiv.appendChild(accordionDiv);
  }

  return moleculesDiv;
}
