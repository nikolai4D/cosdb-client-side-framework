//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_NavItem() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: await this.atom() },
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
