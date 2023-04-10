//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";

export function Molecule_Heading_Input_Button() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Input",
      component: new Atom_Input(),
    },
    {
      id: 2,
      atom: "Atom_ButtonPositive",
      component: new Atom_ButtonPositive(),
    },
    {
      id: 3,
      atom: "Atom_Heading4",
      component: new Atom_Heading4(),
    },
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "Molecule_Input_Button" },
      await this.atom(3, null),
      await this.atom(1, null),
      await this.atom(2, null)
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
