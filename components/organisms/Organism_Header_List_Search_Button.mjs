//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Heading_List } from "../molecules/Molecule_Heading_List.mjs";
import { Molecule_Heading_Input_Button } from "../molecules/Molecule_Heading_Input_Button.mjs";
import { Organism_Modal } from "./Organism_Modal.mjs";

export function Organism_Header_List_Search_Button() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 1,
      organism: "Organism_Modal",
      component: new Organism_Modal(),
    },
  ];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Heading_Input_Button",
      component: new Molecule_Heading_Input_Button(),
    },
    {
      id: 2,
      molecule: "Molecule_Heading_List",
      component: new Molecule_Heading_List(),
    },
  ];

  this.functions = [];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { className: "organism_header_list_search_button" },
      await createElement(
        "div",
        { class: "molecule_heading_input_button" },
        await this.molecule(1, null)
      ),
      await createElement(
        "div",
        { class: "molecule_heading_list" },
        await this.molecule(2, listItem)
      ),
      await createElement(
        "div",
        { class: "modal" },
        await this.childOrganism(1, null)
      )
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data = null) => {
    return await component(data);
  };

  //add component specific functions here
  const listItem = (data = {
    header: "header",
    content: [{ title: "placeholder 1" }, { title: "placeholder 2" }],
  });
}
