//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Organism_TestChild2 } from "./Organism_TestChild2.mjs";

export function Organism_TestParent() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 1,
      organism: "Organism_TestChild2",
      component: new Organism_TestChild2(),
    },
  ];

  this.molecules = [
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
      { class: "Organism_TemplateParent" },
      await createElement("div", {}, await this.molecule(1, compData)),
      await createElement("div", {}, await this.childOrganism(1, compData))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here
  const compData = [
    //placeholder data, set this data from State instead!
    { title: "title1" },
    { title: "title2" },
    { title: "title3" },
  ];
}
