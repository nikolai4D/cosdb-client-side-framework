import { Molecule_Dev1 } from "../molecules/Molecule_Dev1.mjs";
import { Molecule_Dev2 } from "../molecules/Molecule_Dev2.mjs";
import { html2dom } from "../../core/helpers.mjs";
import { Organism } from "../../core/Organism.mjs";

export function Organism_Dev1() {
  Organism.call(this);

  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Dev1",
      component: new Molecule_Dev1(),
    },
    {
      id: 2,
      molecule: "Molecule_Dev2",
      component: new Molecule_Dev2(),
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

  const organism = async () => {
    return await html2dom`
    <div class="organism_dev1">
    <div>${await this.molecule(1)}</div>
    <div>${await this.molecule(2)}</div>
  </div>`;
  };

  this.render = async () => {
    return await organism();
  };
}
