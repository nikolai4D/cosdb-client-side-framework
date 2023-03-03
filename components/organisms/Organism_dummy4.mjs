export function Organism_dummy4() {


  this.molecules = [
    {
      molecule: "Molecule_dummy3"
    },
    {
      molecule: "Molecule_dummy4"
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
    <div>${this.molecules[0].molecule}</div>
    <div>${this.molecules[1].molecule}</div>
  </div>
`;
}
