//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_LoginForm } from "../molecules/Molecule_LoginForm.mjs";


export function Organism_LoginFormCard() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_LoginForm",
      component: new Molecule_LoginForm(),
    }
  ];

  this.functions = [];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "organism_loginformcard" },
      await createElement(
        "div",
        { class: "organism_loginformcard__card" },
        await this.molecule(1, null)
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
