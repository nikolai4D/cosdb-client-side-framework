//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Logo } from "../molecules/Molecule_Logo.mjs";
import { Molecule_Icon_NavItem } from "../molecules/Molecule_Icon_NavItem.mjs";
import { Molecule_Text_Button } from "../molecules/Molecule_Text_Button.mjs";

//import functions
import { action_logoutRequest } from "../../data-mgmt/actions/action_logoutRequest.mjs";
import { action_routeToView } from "../../data-mgmt/actions/action_routeToView.mjs";
import { action_getLoggedInUser } from "../../data-mgmt/actions/action_getLoggedInUser.mjs";

export function Organism_Navbar() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Logo",
      component: new Molecule_Logo(),
    },
    {
      id: 2,
      molecule: "Molecule_Icon_NavItem",
      component: new Molecule_Icon_NavItem(),
    },
    {
      id: 3,
      molecule: "Molecule_Text_Button",
      component: new Molecule_Text_Button(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "action_logoutRequest",
      component: action_logoutRequest,
    },
    {
      id: 2,
      function: "action_routeToView",
      component: action_routeToView,
    },
    {
      id: 3,
      function: "action_getLoggedInUser",
      component: action_getLoggedInUser,
    },
  ];

  //build component
  const component = async () => {

    const userAndLogoutButton = await this.molecule(3, null)

    const username = await this.fn(3)
    // const username = await action_getUsername()
    const userDOM = userAndLogoutButton.firstChild;
    userDOM.textContent = username;

    const logoutButton = userAndLogoutButton.lastChild;
    logoutButton.addEventListener("click", async () => {
      await this.fn(1)
      await this.fn(2)
    })

    const comp = await createElement(
      "div",
      { class: "organism_navbar" },
      await createElement(
        "div",
        { class: "organism_navbar__logo" },
        await this.molecule(1, null)
      ),
      await createElement(
        "div",
        { class: "organism_navbar__icon_navitem" },
        await this.molecule(2, null)
      ),
      await createElement(
        "div",
        { class: "organism_navbar__text_button" },
        userAndLogoutButton
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
