//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dropdown() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "select",
      { class: "atom_dropdown", id: "parentSelectNewObject"},
      null
    );
    // Create an option element for each value in compData
    console.log(compData);

        // Create an empty, unselectable option
        const emptyOption = await createElement(
          "option",
          { disabled: true, selected: true },
          await this.atom()
        );
        comp.appendChild(emptyOption);

    for (const value of compData) {

      const option = await createElement(
        "option",
        { value: value.title, id: value.id },
        document.createTextNode(value.title)
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