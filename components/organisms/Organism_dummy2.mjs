export function Organism_dummy2() {
  this.subComponents = [
    {
      subComponent: "Molecule_dummy3"
    },
    {
      subComponent: "Molecule_dummy4"
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
    <div>${this.subComponents[0].subComponent}</div>
    <div>${this.subComponents[1].subComponent}</div>
  </div>
`;
}
