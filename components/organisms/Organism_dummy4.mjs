export function Organism_dummy4() {
  this.organisms = [
    {
      organism: "Molecule_dummy3"
    },
    {
      organism: "Molecule_dummy4"
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
    <div>${this.organisms[0].organism}</div>
    <div>${this.organisms[1].organism}</div>
  </div>
`;
}
