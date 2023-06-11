 //import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Dropdown_Input_Button } from "../molecules/Molecule_Dropdown_Input_Button.mjs";


export function Organism_Modal_Dropdown_Input_Button() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Dropdown_Input_Button",
      component: new Molecule_Dropdown_Input_Button(),
    },

  ];

  this.functions = [


  ];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "Organism_Modal_Dropdown_Input_Button" },
      await createElement("div", {}, await this.molecule(1, compData))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data = ["option1", "option2"]) => {
    return await component(data);
  };

  //add component specific functions here
}
