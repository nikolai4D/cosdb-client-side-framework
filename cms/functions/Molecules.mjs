import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Atoms } from "./Atoms.mjs";

export function Molecules(molecules) {
  let moleculesHtml = "";

  for (const mol of molecules) {
    const body = `${Functions(mol.functions)}<br>
    ${Atoms(mol.atoms)}`;
    moleculesHtml += `${accordian("molecule", mol.molecule, body, true)} <br>`;
  }

  return `   
    <div class="molecules">
      ${moleculesHtml}
    </div>
  `;
}
