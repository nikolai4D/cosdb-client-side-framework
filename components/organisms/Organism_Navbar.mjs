//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Logo } from "../molecules/Molecule_Logo.mjs";
import { Molecule_Icon_NavItem } from "../molecules/Molecule_Icon_NavItem.mjs";
import { Molecule_Text_Button } from "../molecules/Molecule_Text_Button.mjs";

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
      molecule: "Molecule_Icon_NavItem",
      component: new Molecule_Icon_NavItem(),
    },
    {
      id: 3,
      molecule: "Molecule_Icon_NavItem",
      component: new Molecule_Icon_NavItem(),
    },
  ];

  this.functions = [];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "organism_navbar" },
      await createElement(
        "div",
        { class: "organism_navbar__logo" },
        await this.molecule(1, null)
      ),
      await createElement(
        "div",
        { class: "organism_navbar__icon_navitem" },
        await this.molecule(2, null)
      ),
      await createElement(
        "div",
        { class: "organism_navbar__icon_navitem" },
        await this.molecule(3, null)
      )
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
