//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import components
import { Molecule_Template } from "../molecules/_Molecule_Template.mjs";
import { Organism_TemplateChild } from "./_Organism_TemplateChild.mjs";

export function Organism_TemplateParent() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 1,
      organism: "Organism_TemplateChild",
      component: new Organism_TemplateChild(),
    },
  ];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Template",
      component: new Molecule_Template(),
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
      { className: "Organism_TemplateParent" },
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
