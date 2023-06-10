//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_NavItem } from "../atoms/Atom_NavItem.mjs";
import { action_getArray } from "../../data-mgmt/actions/action_getArray.mjs";
import { action_routeToView } from "../../data-mgmt/actions/action_routeToView.mjs";

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
      function: "action_getArray",
      component: new action_getArray(),
    },
    {
      id: 2,
      function: "action_routeToView",
      component: new action_routeToView(),
    },
  ];

  //build component
  const component = async (compData) => {
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
  const navItems = async () => {
    return (
      (await this.fn(1)) || [{ icon: "icon", title: "title", route: "route" }]
    );
  };

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
        const currentView = window.location.pathname.slice(1);

        navItem.addEventListener("click", async () => {
          const newView = item.route.toLowerCase();

          if (currentView !== newView) {
            await this.fn(2, newView);
          } else {
          }
        });

        if (currentView === item.title.toLowerCase()) {
          navItem.style.fontWeight = "bold";
        }

        return navItem;
      })
    );
  };
}
