export function Organism_dummy1() {
  this.organisms = [
    {
      organism1: "Organism_dummy2",
    },
  ];

  this.molecules = [
    {
      molecule1: "Molecule_dummy1",
    },
    {
      molecule2: "Molecule_dummy2",
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
    <div>${this.organisms[0].organism}</div>
    <div>${this.molecules[0].molecule}</div>
    <div>${this.molecules[1].molecule}</div>
  </div>
`;
}
