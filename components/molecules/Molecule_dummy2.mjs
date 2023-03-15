export function Molecule_dummy2() {
  this.atoms = [{ id: 1, atom: "Atom_dummy4" }];

  this.functions = [{ id: 1, function: "placeholder" }];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
  </div>
`;
}
