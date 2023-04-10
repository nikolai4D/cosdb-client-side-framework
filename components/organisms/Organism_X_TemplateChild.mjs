//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_X_Template } from "../molecules/Molecule_X_Template.mjs";

export function Organism_X_TemplateChild() {
  Organism.call(this);

  // sub components
  this.organisms = [];

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
  const component = async (
    compData = [{ title: "Organism_TemplateChild placeholder data" }]
  ) => {
    const comp = await createElement(
      "div",
      { className: "Organism_TemplateChild" },
      await createElement("div", {}, await this.molecule(1, compData))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
}
