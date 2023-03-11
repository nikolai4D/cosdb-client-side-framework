export function Organism_dummy1() {
  this.organisms = [
    {
      organism: "Organism_dummy2",
    },
  ];

  this.molecules = [
    {
      molecule: "Molecule_dummy1",
    },
    {
      molecule: "Molecule_dummy2",
    },
  ];

  this.functions = [
    {
      function: "function1",
    },
    {
      function: "function2",
    },
  ];

  return `
  <div>
    <div>${this.organisms[0].organism}</div>
    <div>${this.molecules[0].molecule}</div>
    <div>${this.molecules[1].molecule}</div>
  </div>
`;
}
