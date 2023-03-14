export function Molecule_dummy2() {
  this.atoms = [
    {
      atom1: "Atom_dummy4",
    },
  ];

  this.functions = [
    {
      function1: "function2",
    },
  ];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
  </div>
`;
}
