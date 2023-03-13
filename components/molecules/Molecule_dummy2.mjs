export function Molecule_dummy2() {
  this.atoms = [
    {
      atom: "Atom_dummy4",
    },
  ];

  this.functions = [
    {
      function: "function2",
    },
  ];

  return `
  <div>
    <div>${this.atoms[0].atom}</div>
  </div>
`;
}
