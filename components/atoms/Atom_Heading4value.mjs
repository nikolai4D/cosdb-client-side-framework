//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Heading4value() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "h4",
      {
        class: `${await this.atom()} atom_heading4`,
      },
      await this.atom()
    );
    //add event listeners here
    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
}
