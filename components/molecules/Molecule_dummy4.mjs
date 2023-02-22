import { Atom_dummy1 } from "../atoms/atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/atom_dummy2.mjs";

export function Molecule_dummy4() {
  this.subComponents = [
    {
      subComponent: "Atom_dummy3"
    },
    {
      subComponent: "Atom_dummy4"
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
    <div>${this.molecules[0].molecule}</div>
    <div>${this.molecules[1].molecule}</div>
  </div>
`;
}
