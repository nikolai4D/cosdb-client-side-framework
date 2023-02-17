import { Atom_dummy1 } from "../atoms/atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/atom_dummy2.mjs";

export function Molecule_dummy2() {
  this.atoms = {
    atom_dummy1: new Atom_dummy1(),
    atom_dummy2: new Atom_dummy2(),
  };

  this.functions = {
    function1: null,
    function2: null,
  };

  return `
  <div>
        <div>${this.atoms.atom_dummy1}</div>
        <div>${this.atoms.atom_dummy2}</div>
  </div>
`;
}
