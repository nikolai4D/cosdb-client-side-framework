import { Molecule_dummy1 } from "../atoms/Molecule_dummy1.mjs";
import { Molecule_dummy2 } from "../atoms/Molecule_dummy2.mjs";

export function Organism_dummy2() {
  this.molecules = {
    Molecule_dummy1: new Molecule_dummy1(),
    Molecule_dummy2: new Molecule_dummy2(),
  };

  this.functions = {
    function1: null,
    function2: null,
  };

  return `
  <div>
        <div>${this.molecules.Molecule_dummy1}</div>
        <div>${this.molecules.Molecule_dummy2}</div>
  </div>
`;
}
