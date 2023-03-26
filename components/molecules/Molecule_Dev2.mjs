import { Atom_Dev1 } from "../atoms/Atom_Dev1.mjs";
import { Atom_Dev2 } from "../atoms/Atom_Dev2.mjs";
import { html2dom } from "../../core/helpers.mjs";
import { Molecule } from "../../core/Molecule.mjs";

export function Molecule_Dev2() {
  Molecule.call(this);
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Dev1",
      component: new Atom_Dev1(),
    },
    {
      id: 2,
      atom: "Atom_Dev2",
      component: new Atom_Dev2(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: function placeholder1() {
        //console.log("placeholder1");
      },
    },
    {
      id: 2,
      function: function placeholder2() {
        //console.log("placeholder2");
      },
    },
  ];

  this.fn(1);
  this.fn(2);

  const molecule = async () => {
    return await html2dom`
    <div class="molecule_dummy4">
    <div>${await this.atom(1)}</div>
    <div>${await this.atom(2)}</div>
    <div>${await this.atom(1)}</div>
    <div>${await this.atom(2)}</div>
  </div>`;
  };

  this.render = async () => {
    return await molecule();
  };
}
