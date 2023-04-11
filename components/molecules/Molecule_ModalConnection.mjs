//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
// import { Atom_ParagraphDataBold } from "../atoms/Atom_ParagraphDataBold.mjs";
// import { Atom_ParagraphData } from "../atoms/Atom_ParagraphData.mjs";

export function Molecule_ModalConnection() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading4", // connections type
      component: new Atom_Heading4(),
    },
    {
      id: 2,
      atom: "Atom_Icon", // add connection
      component: new Atom_Icon(),
    },
    {
      id: 3,
      atom: "Atom_ParagraphDataBold", // node title
      component: new Atom_ParagraphDataBold(),
    },
    {
      id: 4,
      atom: "Atom_ParagraphData", // rel title
      component: new Atom_ParagraphData(),
    },
    {
      id: 5,
      atom: "Atom_Icon", // delete rel
      component: new Atom_Icon(),
    },
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "molecule_modalconnection" },
      await createElement(
        "div",
        { class: "molecule_modalconnection__header" },
        await this.atom(1, null),
        await this.atom(2, "bi bi-plus-circle-fill")
      ),
      await createElement(
        "div",
        { class: "molecule_modalconnection__list" },
        await createElement("div", {}, ...(await items(compData)))
      )
    );

    //add event listener to the comp here
    return comp;
  };

  //render component
  this.render = async (
    data = [{ node: "node placeholder", rel: "rel placeholder" }]
  ) => {
    return await component(data);
  };

  //add component specific functions here
  const items = async (arrayOfData) => {
    return await Promise.all(
      arrayOfData.map(async (item) => {
        return await createElement(
          "div", // shall not be LI
          { class: "molecule_modalconnection__list__item" },
          await this.atom(3, item.node.title),
          await this.atom(4, item.rel.title),
          await this.atom(5, "bi bi-trash-fill")
        );
      })
    );
  };
}
//
