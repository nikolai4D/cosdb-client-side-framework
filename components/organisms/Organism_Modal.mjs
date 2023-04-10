//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
// import { Molecule_X_Template } from "../molecules/Molecule_X_Template.mjs";

export function Organism_Modal() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    // {
    //   id: 1,
    //   molecule: "Molecule_X_Template",
    //   component: new Molecule_X_Template(),
    // },
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "organism_modalContent2", id: "organism_modalContent2" },
      await createElement("div", {}, compData)
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
