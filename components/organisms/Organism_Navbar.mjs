//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Logo } from "../molecules/Molecule_Logo.mjs";

export function Organism_Navbar() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Logo",
      component: new Molecule_Logo(),
    },
    {
      id: 2,
      molecule: "Molecule_List-Icon-Link",
      component: "new Molecule_X_Template(),",
    },
    {
      id: 3,
      molecule: "Molecule_Text-Button",
      component: "new Molecule_X_Template(),",
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
      "nav",
      { className: "Organism_Navbar" },
      await createElement("div", {}, await this.molecule(1, null))
      //   await createElement("ul", {}, await this.molecule(2, null)),
      //   await createElement("div", {}, await this.molecule(3, null))
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
