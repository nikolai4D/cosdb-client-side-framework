//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";

import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_Heading4value } from "../atoms/Atom_Heading4value.mjs";

//import functions
import { action_loginRequest } from "../../data-mgmt/actions/action_loginRequest.mjs";

export function Molecule_LoginForm() {
  Molecule.call(this);

  // sub components
  this.atoms = [
    {
        id: 1,
        atom: "Atom_Heading4value",
        component: new Atom_Heading4value()
    },
    {
        id: 2,
        atom: "Atom_Input", // back
        component: new Atom_Input(),
      },    
      {
        id: 3,
        atom: "Atom_Input", // back
        component: new Atom_Input(),
      },    
      {
        id: 4,
        atom: "Atom_ButtonPositive",
        component: new Atom_ButtonPositive(),
      },
  ];

  this.functions = [
    {
      id: 1,
      function: "action_loginRequest",
      component: action_loginRequest,
    },
  ];

  //build component
  const component = async (compData = null) => {
  
    const email = await this.atom(2, null)
    const password = await this.atom(3, null)
    const button = await this.atom(4, null)

    password.type = "password"

    button.addEventListener("click", async () => {

      // change to new way of using function later, i.e. await this.fn(1)
      const emailAndPwd = { email: email.value, pwd: password.value}
      //action_loginRequest(email.value, password.value)
      await this.fn(1, emailAndPwd)
      
    })

    const comp =
      await createElement("div", { class: "molecule_loginform" },
      await this.atom(1, null),
      await email,
      await password,
      await button
  )

    //add event listener to the comp here
    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
}
