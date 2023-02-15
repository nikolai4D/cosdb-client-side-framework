import { input } from "./types/input.mjs";

export function Atoms(atoms) {
  const atomsDiv = document.createElement("div");
  atomsDiv.classList.add("atoms");

  for (const atom of atoms) {
    const key = atom.atom;
    const value = atom.option;
    const id = atom.atomId;
    atomsDiv.appendChild(input(key, value, id, false));
    atomsDiv.appendChild(document.createElement("br"));
  }

  return atomsDiv;
}
