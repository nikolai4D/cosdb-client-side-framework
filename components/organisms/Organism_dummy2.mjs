export function Organism_dummy2() {
  this.organisms = [
    {
      organism: "Organism_dummy1"
    }
  ]

  this.functions = [
    {
      function: "function3",
    },
    {
      function: "function4",
    }
  ]

  return `
  <div>
    <div>${this.organisms[0].organism}</div>
  </div>
`;
}
