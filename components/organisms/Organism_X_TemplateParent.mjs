//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import components
import { Molecule_X_Template } from "../molecules/Molecule_X_Template.mjs";
import { Organism_X_TemplateChild } from "./Organism_X_TemplateChild.mjs";

export function Organism_X_TemplateParent() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 1,
      organism: "Organism_X_TemplateChild",
      component: new Organism_X_TemplateChild(),
    },
  ];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_X_Template",
      component: new Molecule_X_Template(),
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
