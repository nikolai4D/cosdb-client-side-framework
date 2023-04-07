//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Paragraph } from "../atoms/Atom_Paragraph.mjs";
import { Atom_ButtonNeutral } from "../atoms/Atom_ButtonNeutral.mjs";

export function Molecule_Text_Button() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Paragraph",
      component: new Atom_Paragraph(),
    },
    {
      id: 2,
      atom: "Atom_ButtonNeutral",
      component: new Atom_ButtonNeutral(),
    },
  ];

  this.functions = [];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "molecule_text_button" },
      await this.atom(1, ""),
      await this.atom(2, "")
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
