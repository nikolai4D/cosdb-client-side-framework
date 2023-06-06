//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Test2 } from "../molecules/Molecule_Test2.mjs";
import { Organism_TestChild } from "./Organism_TestChild.mjs";

export function Organism_TestParent() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 1,
      organism: "Organism_TestChild",
      component: new Organism_TestChild(),
    },
  ];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Test2",
      component: new Molecule_Test2(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
  ];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "Organism_TemplateParent" },
      await createElement("div", {}, await this.molecule(1, compData)),
      await createElement("div", {}, await this.childOrganism(1, compData))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
  const compData = [
    //placeholder data, set this data from State instead!
    { title: "title1" },
    { title: "title2" },
    { title: "title3" },
  ];
}
