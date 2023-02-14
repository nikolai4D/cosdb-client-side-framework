import { input } from "./types/input.mjs";

export function Atoms(atoms) {
  const atomsDiv = document.createElement("div");
  atomsDiv.classList.add("atoms");

  for (const atom of atoms) {
    const key = atom.atom;
    const value = atom.option;
    atomsDiv.appendChild(input(key, value));
    atomsDiv.appendChild(document.createElement("br"));
  }

  return atomsDiv;
}
