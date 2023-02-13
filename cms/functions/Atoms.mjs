import { input } from "./types/input.mjs";

export function Atoms(atoms) {
  let atomsHtml = "";

  for (const atom of atoms) {
    const key = atom.atom;
    const value = atom.option;
    atomsHtml += `${input(key, value)}<br>`;
  }

  return `   
    <div class="atoms">
      ${atomsHtml}
    </div>
  `;
}
