//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Test2 } from "../atoms/Atom_Test2.mjs";

export function Molecule_Test() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Test2",
      component: new Atom_Test2(),
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
