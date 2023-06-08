//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";

import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_Heading4value } from "../atoms/Atom_Heading4value.mjs";

export function Molecule_LoginForm() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
        id: 1,
        atom: "Atom_Heading4value",
        component: new Atom_Heading4value()
    },
    {
        id: 2,
        atom: "Atom_Input", // back
        component: new Atom_Input(),
      },    
      {
        id: 3,
        atom: "Atom_Input", // back
        component: new Atom_Input(),
      },    
      {
        id: 4,
        atom: "Atom_ButtonNeutral",
        component: new Atom_ButtonPositive(),
      },
  ];

  this.functions = [];

  //build component
  const component = async (compData = null) => {
    const comp =
      await createElement("div", { class: "molecule_loginform" },
      
      await this.atom(1, null),
      await this.atom(2, null),
      await this.atom(3, null),
      await this.atom(4, null)
  )

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
}