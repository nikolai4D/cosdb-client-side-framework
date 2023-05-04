//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";

export function Molecule_ModalHeader() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Icon", // back
      component: new Atom_Icon(),
    },
  ];

  this.functions = [];

  //build component
  const component = async (compData = null) => {
    const comp = await createElement(
      "div",
      { class: "molecule_modalheader" },
      await createElement(
        "div",
        { class: "molecule_modalheader__back", id: compData },
        await this.atom(1, "´bi bi-arrow-left")
      ),
      await createElement(
        "div",
        { class: "molecule_modalheader__close" },
        await this.atom(1, "bi bi-x-lg")
      )
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
