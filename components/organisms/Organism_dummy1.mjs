export function Organism_dummy1() {
  this.subComponents = [
    {
      subComponent: "Molecule_dummy1"
    },
    {
      subComponent: "Molecule_dummy2"
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
        <div>${this.subComponents[0].subComponent}</div>
        <div>${this.subComponents[1].subComponent}</div>
  </div>
`;
}
