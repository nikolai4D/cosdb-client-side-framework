export function Molecule_dummy4() {
  this.atoms = [
    { id: 1, atom: "Atom_dummy3" },
    { id: 2, atom: "Atom_dummy4" },
  ];

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
    <div>${this.atoms[1].atom}</div>
  </div>
`;
}
