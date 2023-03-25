import { Molecule_Dev1 } from "../molecules/Molecule_Dev1.mjs";
import { Molecule_Dev2 } from "../molecules/Molecule_Dev2.mjs";
import { Organism_Dev1 } from "../organisms/Organism_Dev1.mjs";
import { html2dom } from "../../core/helpers.mjs";

export function Organism_Dev2() {
  this.organisms = [
    {
      id: 1,
      organism: "Organism_Dev1",
      component: new Organism_Dev1(),
    },
  ];

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

  const org = (id) =>
    this.organisms.find((org) => org.id === id)?.component || "";
  const molecule = (id) =>
    this.molecules.find((mol) => mol.id === id)?.component || "";

  const organism = async () => {
    return await html2dom`
    <div class="molecule_dummy4">
    <div>${org(1)}</div>
    <div>${molecule(1)}</div>
    <div>${molecule(2)}</div>
  </div>`;
  };

  this.render = async () => {
    return await organism();
  };
}
