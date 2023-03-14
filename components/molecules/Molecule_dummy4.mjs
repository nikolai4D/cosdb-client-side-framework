export function Molecule_dummy4() {
  this.atoms = [
    {
      atom1: "Atom_dummy3",
    },
    {
      atom2: "Atom_dummy4",
    },
  ];

  this.functions = [
    {
      function1: "function1",
    },
    {
      function2: "function2",
    },
  ];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
    <div>${this.atoms[1].atom}</div>
  </div>
`;
}
