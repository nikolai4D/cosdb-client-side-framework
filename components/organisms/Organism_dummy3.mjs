export function Organism_dummy3() {
  this.organisms = [
    {
      organism: "Organism_dummy4"
    },
    {
      organism: "Organism_dummy4"
    }
  ]

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
  ];


  return `
  <div>
    <div>${this.organisms[0].organism}</div>
    <div>${this.organisms[1].organism}</div>
≈
  </div>
`;
}
