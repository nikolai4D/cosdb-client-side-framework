//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_X_Template } from "../atoms/Atom_X_Template.mjs";

export function Molecule_X_Template() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_X_Template",
      component: new Atom_X_Template(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
  ];

  //build component
  const component = async (
    compData = [{ title: "placeholder 1" }, { title: "placeholder 2" }]
  ) => {
    const comp = await createElement(
      "div",
      { class: "molecule_template" },
      await createElement("ul", {}, ...(await items(compData)))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
  const items = async (arrayOfData) => {
    return await Promise.all(
      arrayOfData.map(async (item) => {
        return await this.atom(1, item.title);
      })
    );
  };
}
