export function Organism_dummy1() {
  this.organisms = [
    {
      organism: "Organism_dummy2",
    },
    {
      organism: "Organism_dummy3",
    },
  ];

  this.functions = [
    {
      function: "function3",
    },
    {
      function: "function4",
    },
  ];

  return `<div>
    <div>${this.organisms[0].organism}</div>
    <div>${this.organisms[1].organism}</div>
  </div>
  `;
}
