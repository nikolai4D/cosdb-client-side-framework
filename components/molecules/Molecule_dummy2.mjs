export function Molecule_dummy2() {
  this.atoms = [
    {
      atom: "Atom_dummy3"
    },
    {
      atom: "Atom_dummy4"
    }
  ]

  this.functions = [
    {
      function: "function1",
    },
    {
      function: "function2",
    }
  ]


  return `
  <div>
    <div>${this.atoms[0].atom}</div>
    <div>${this.atoms[1].atom}</div>
  </div>
`;
}
