import { Atom_Dev1 } from "../atoms/Atom_Dev1.mjs";
import { Atom_Dev2 } from "../atoms/Atom_Dev2.mjs";
import { html2dom } from "../../core/helpers.mjs";

export function Molecule_Dev1() {
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
        console.log("placeholder1");
      },
    },
    {
      id: 2,
      function: function placeholder2() {
        console.log("placeholder2");
      },
    },
  ];

  const fn = (id) =>
    this.functions.find((fn) => fn.id === id)?.function() || "";
  fn(1);
  fn(2);

  const atom = (id) =>
    this.atoms.find((atom) => atom.id === id)?.component || "";

  const molecule = async () => {
    return await html2dom`
    <div class="molecule_dummy4">
    <div>${atom(1)}</div>
    <div>${atom(2)}</div>
  </div>`;
  };

  this.render = async () => {
    return await molecule();
  };
}
