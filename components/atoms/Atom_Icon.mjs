//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Icon() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "i",
      { class: `${await this.atom()} atom_icon` },
      ""
    );
    //add event listeners here
    return comp;
  };

  //render component
  this.render = async (data = "Icon data") => {
    return await component(data);
  };

  //add component specific functions here
}
