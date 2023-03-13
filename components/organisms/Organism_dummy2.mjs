export function Organism_dummy2() {
  this.molecules = [
    {
      molecule: "Molecule_dummy2",
    },
  ];

  this.functions = [
    {
      function: "function2",
    },
  ];

  return `
    <div>
      <div>${this.molecules[0].molecule}</div>
    </div>
  `;
}
