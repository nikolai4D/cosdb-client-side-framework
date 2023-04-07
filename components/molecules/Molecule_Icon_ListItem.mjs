//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_Icon_ListItem() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Icon",
      component: new Atom_Icon(),
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
  const component = async () => {
    const comp = await createElement(
      "div",
      { className: "Molecule_Template" },
      await createElement(
        "ul",
        {},
        ...(await listItemsWithIcons(await listItems()))
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

  //get menu items from await this.fn(1)
  const listItems = async () => await this.fn(1);

  //loopa varje item och sätt in i Atom_ListItem
  const listItemsWithIcons = async (arrayOfData) => {
    return await Promise.all(
      arrayOfData.map(async (item) => {
        return await createElement(
          "div",
          {},
          await this.atom(1, item.icon),
          await this.atom(2, item.title)
        );
      })
    );
  };
}
