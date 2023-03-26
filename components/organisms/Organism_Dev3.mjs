import { Molecule_Dev1 } from "../molecules/Molecule_Dev1.mjs";
import { Molecule_Dev2 } from "../molecules/Molecule_Dev2.mjs";
import { Organism_Dev1 } from "./Organism_Dev1.mjs";
import { Organism_Dev2 } from "./Organism_Dev2.mjs";
import { html2dom } from "../../core/helpers.mjs";

export function Organism_Dev3() {
  this.organisms = [
    // {
    //   id: 1,
    //   organism: "Organism_Dev1",
    //   component: new Organism_Dev1(),
    // },
    // {
    //   id: 2,
    //   organism: "Organism_Dev2",
    //   component: new Organism_Dev2(),
    // },
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

  const fn = (id) =>
    this.functions.find((fn) => fn.id === id)?.function() || "";
  fn(1);
  fn(2);

  const childOrganism = async (id) => {
    const component = this.organisms.find(
      (childOrg) => childOrg.id === id
    )?.component;
    const componentArray = component ? Array.from(component) : [];
    return componentArray.map((elem) => elem.outerHTML).join("");
  };

  const molecule = async (id) => {
    const component = this.molecules.find((mol) => mol.id === id)?.component;
    const componentArray = component ? Array.from(component) : [];
    return componentArray.map((elem) => elem.outerHTML).join("");
  };

  const organism = async () => {
    return await html2dom`
    <div class="organism_dev2">
    <div>${await childOrganism(1)}</div>
    <div>${await molecule(1)}</div>
    <div>${await molecule(2)}</div>
    <div>${await childOrganism(2)}</div>
    <div>${await molecule(1)}</div>
    <div>${await molecule(2)}</div>
    <div>${await childOrganism(2)}</div>
  </div>`;
  };

  this.render = async () => {
    return await organism();
  };
}
