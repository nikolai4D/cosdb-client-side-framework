export function Organism_dummy2() {
  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_dummy2",
    },
  ];

  this.functions = [{ id: 1, function1: "placeholder" }];

  return `
    <div>
      <div>${this.molecules[0].molecule}</div>
    </div>
  `;
}
