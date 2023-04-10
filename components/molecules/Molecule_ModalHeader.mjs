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
    {
      id: 2,
      atom: "Atom_Icon", // close
      component: new Atom_Icon(),
    },
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "molecule_modalheader" },
      await createElement(
        "div",
        { class: "molecule_modalheader__back" },
        this.atom(1, "bi bi-arrow-left")
      ),
      await createElement(
        "div",
        { class: "molecule_modalheader__close" },
        this.atom(2, "bi bi-x")
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
