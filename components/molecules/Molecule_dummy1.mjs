export function Molecule_dummy1() {
  this.atoms = [
    {
      atom1: "Atom_dummy1",
    },
    {
      atom2: "Atom_dummy2",
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
