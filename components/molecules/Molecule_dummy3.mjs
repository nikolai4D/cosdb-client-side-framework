export function Molecule_dummy3() {
  this.atoms = [
    { id: 1, atom: "Atom_dummy1" },
    { id: 2, atom: "Atom_dummy2" },
  ];

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
    <div>${this.atoms[1].atom}</div>
  </div>>
`;
}
