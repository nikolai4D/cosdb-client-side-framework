import { createElement } from "../../core/helpers/createElement.mjs";
import { Molecule_ListWHeading2 } from "../molecules/Molecule_ListWHeading2.mjs";
import { Organism } from "../../core/Organism.mjs";

export function Organism_ListAll2() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_ListWHeading2",
      component: new Molecule_ListWHeading2(),
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
  ];

  //built component

  const component = async () => {
    const comp = await createElement(
      "div",
      { className: "Organism_ListAll2" },
      await createElement("div", {}, await this.molecule(1, "Header2"))
    );

    //add event listener to the comp here

    return comp;
  };

  //render component

  this.render = async () => {
    return await component();
  };

  //add component specific functions here
}
