export function Organism_dummy2() {
  this.molecules = [
    {
      molecule1: "Molecule_dummy2",
    },
  ];

  this.functions = [
    {
      function1: "function2",
    },
  ];

  return `
    <div>
      <div>${this.molecules[0].molecule}</div>
    </div>
  `;
}
