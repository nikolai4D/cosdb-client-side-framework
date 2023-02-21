import { Atom_dummy1 } from "../atoms/atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/atom_dummy2.mjs";

export function Molecule_dummy2() {
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
    <div>${this.subComponents[0].subComponent}</div>
    <div>${this.subComponents[1].subComponent}</div>
  </div>
`;
}
