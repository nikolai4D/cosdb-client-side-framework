//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_NavItem } from "../atoms/Atom_NavItem.mjs";

export function Molecule_Icon_NavItem() {
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
      atom: "Atom_NavItem",
      component: new Atom_NavItem(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "getNavItems",
    },
    {
      id: 2,
      function: "routeToView",
    },
  ];

  //build component
  const component = async () => {
    console.log(await navItems());
    const comp = await createElement(
      "div",
      { class: "molecule_icon_navitem" },
      await createElement(
        "ul",
        { class: "molecule_icon_navitem__navitems" },
        ...(await navItemsWithIcons(await navItems()))
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
  const navItems = async () => await this.fn(1);

  //loopa varje item och sätt in i Atom_ListItem
  const navItemsWithIcons = async (arrayOfData) => {
    return await Promise.all(
      arrayOfData.map(async (item) => {
        const navItem = await createElement(
          "div",
          { class: "molecule_icon_navitem__navitems__navitem" },
          await this.atom(1, item.icon),
          await this.atom(2, item.title)
        );
        navItem.addEventListener("click", async () => {
          const newView = item.route.toLowerCase();
          console.log("newView: ", newView);

          const currentView = window.location.pathname.slice(1);
          if (currentView !== newView) {
            console.log("route to view: ", newView);
            await this.fn(2, newView);
          } else {
            console.log("already in view: ", newView);
          }
        });
        return navItem;
      })
    );
  };
}
