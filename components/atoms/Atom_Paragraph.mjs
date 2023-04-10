//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Paragraph() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "p",
      { class: "Atom_Paragraph" },
      await this.atom()
    );
    //add event listeners here
    return comp;
  };

  //render component
  this.render = async (data = "data placeholder") => {
    return await component(data);
  };

  //add component specific functions here
}
