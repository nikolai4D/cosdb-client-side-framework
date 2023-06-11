//import core
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
//import sub components
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";

import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_Heading4value } from "../atoms/Atom_Heading4value.mjs";

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

  this.functions = [];

  //build component
  const component = async (compData = null) => {
  
    const email = await this.atom(2, null)
    const password = await this.atom(3, null)
    const button = await this.atom(4, null)

    button.addEventListener("click", async () => {

        console.log(email.value)

        // const response = await fetch("http://localhost:3000/api/login", {


        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     credentials: "include",
        //     body: JSON.stringify({ email: email.value, password: password.value }),
        // }); 

        // if (!response.ok) {

        //     if (response.status === 401) {
        //         alert("Unauthorized");
        //         return false;
        //     }
        //     throw new Error(
        //         `status: ${response.status}, status text: ${response.statusText}`
        //     );
        // }

        // const token = `Bearer ${(await response.json()).accessToken}`;
        // sessionStorage.setItem("accessToken", token);
        // // navigateTo("/admindashboard");
        // // action_routeToView("process");
    })





    const comp =
      await createElement("div", { class: "molecule_loginform" },
      await this.atom(1, null),
      await email,
      await password,
      await button
  )
  console.log(comp)

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
}
