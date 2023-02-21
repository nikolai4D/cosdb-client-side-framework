export function Organism_dummy1() {
  this.subComponents = [
    {
      subComponent: "Molecule_dummy1"
    },
    {
      subComponent: "Molecule_dummy2"
    }
  ]

  this.functions = {
    function1: null,
    function2: null,
  };

  return `
  <div>
        <div>${this.subComponents[0].subComponent}</div>
        <div>${this.subComponents[1].subComponent}</div>
  </div>
`;
}
