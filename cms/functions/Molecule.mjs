import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { Functions } from "./Functions.mjs";

const mols = [
  "molecule1",
  "molecule2",
  "molecule3",
  "molecule4",
  "molecule5",
  "molecule6",
  "molecule7",
  "molecule8",
  "molecule9",
  "molecule10",
];

export function Molecules(molecules) {
  let moleculesHtml = "";

  for (const mol of molecules) {
    const body = `${Functions(mol.functions)}<br>
    atoms: ATOMS`;
    moleculesHtml += `${accordian("molecule", mol.molecule, body, true)} <br>`;
  }

  return `   
    <div class="molecules">
      ${moleculesHtml}
    </div>
  `;
}
