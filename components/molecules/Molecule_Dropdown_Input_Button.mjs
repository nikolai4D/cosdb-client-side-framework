//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Dropdown } from "../atoms/Atom_Dropdown.mjs";
import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_ButtonNeutral } from "../atoms/Atom_ButtonNeutral.mjs";


export function Molecule_Dropdown_Input_Button() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Dropdown",
      component: new Atom_Dropdown(),
    },    
    {
      id: 2,
      atom: "Atom_Input",
      component: new Atom_Input(),
    },
    {
      id: 3,
      atom: "Atom_ButtonNeutral",
      component: new Atom_ButtonNeutral(),
    },
  ];

  this.functions = [
  ];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "molecule_dropdown_input_button" },
     await this.atom(1, compData),
      await this.atom(2, null),
     await this.atom(3, null)
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
