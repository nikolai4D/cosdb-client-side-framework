//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_ModalCenterContent() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    { id: 1, atom: "Atom_Icon", component: new Atom_Icon() }, //edit
    { id: 2, atom: "Atom_Icon", component: new Atom_Icon() }, //close
    { id: 3, atom: "Atom_Icon", component: new Atom_Icon() }, //dependency arrow
    { id: 4, atom: "Atom_Heading4", component: new Atom_Heading4() }, //heading
    { id: 5, atom: "Atom_ListItem", component: new Atom_ListItem() }, //list item
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    console.log(compData);
    const comp = await createElement(
      "div",
      { class: "molecule_modalcentercontent" },
      await createElement(
        "div",
        { class: "molecule_modalcentercontent__leftarrows" },
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__leftarrows__toparrow" },
          await this.atom(3, null)
        ),
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__leftarrows__bottomarrow" },
          await this.atom(3, null)
        )
      ),
      await createElement(
        "div",
        { class: "molecule_modalcentercontent__content" },
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__content__header" },
          await this.atom(4, compData.parentNode),
          await this.atom(1, null),
          await this.atom(2, null)
        ),
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__content__content" },
          await this.atom(5, compData.node)
        )
      ),
      await createElement(
        "div",
        { class: "molecule_modalcentercontent__rightarrows" },
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__rightarrows__toparrow" },
          await this.atom(3, null)
        ),
        await createElement(
          "div",
          { class: "molecule_modalcentercontent__rightarrows__bottomarrow" },
          await this.atom(3, null)
        )
      )
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (
    data = {
      parentNode: "parentNode placeholder",
      node: "node placeholder",
    }
  ) => {
    return await component(data);
  };

  //add component specific functions here
}
