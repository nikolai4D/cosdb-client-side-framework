//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_Heading_List() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading4",
      component: new Atom_Heading4(),
    },
    {
      id: 2,
      atom: "Atom_ListItem",
      component: new Atom_ListItem(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
  ];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "molecule_template" },
      await this.atom(1, compData.header),
      await createElement("ul", {}, ...(await compDatas(compData.content)))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (
    data = {
      header: "header",
      content: [{ title: "placeholder 1" }, { title: "placeholder 2" }],
    }
  ) => {
    return await component(data);
  };

  //add component specific functions here
  const compDatas = async (arrayOfData) => {
    return await Promise.all(
      arrayOfData.map(async (item) => {
        return await this.atom(2, item.title);
      })
    );
  };
}
