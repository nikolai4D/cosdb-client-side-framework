//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dropdown() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "select",
      { class: "atom_dropdown"},
      null
    );
    // Create an option element for each value in compData
    for (const value of compData) {
      const option = await createElement(
        "option",
        { value: value },
        document.createTextNode(value)
      );
      comp.appendChild(option);
    }

    //add event listeners here
    return comp;
  };

  //render component
  this.render = async (data = "data placeholder") => {
    return await component(data);
  };

  //add component specific functions here
}