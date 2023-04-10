//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Input() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "input",
      { class: `atom_input ${await this.atom()}`, type: "text" },
      compData
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
