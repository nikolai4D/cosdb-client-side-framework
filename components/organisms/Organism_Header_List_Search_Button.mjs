//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Heading_List } from "../molecules/Molecule_Heading_List.mjs";
import { Molecule_Heading_Input_Button } from "../molecules/Molecule_Heading_Input_Button.mjs";
import { Organism_Modal } from "./Organism_Modal.mjs";
//import state
import { State } from "../../data-mgmt/State.mjs";

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

  this.functions = [
    {
      id: 1,
      purpose: "set state to be used as list items",
      function: () =>
        (State.items = [
          {
            header: "header1",
            content: [{ title: "placeholder 1" }, { title: "placeholder 2" }],
          },
          {
            header: "header2",
            content: [{ title: "placeholder 3" }, { title: "placeholder 4" }],
          },
        ]),
    },
  ];

  //build component
  const component = async (compData) => {
    const headingInputButton = await createElement(
      "div",
      { class: "molecule_heading_input_button" },
      await this.molecule(1, null)
    );
    headingInputButton.addEventListener("input", async (e) => {
      console.log("input change");
      await updateListItems(e.target.value);
    });
    headingInputButton.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        console.log("button clicked");
        await openModal("click on button");
      }
    });

    const headingList = await createElement(
      "div",
      { class: "molecule_heading_list", id: "listItems" },
      ...(await listItems(compData))
    );

    const modal = await createElement(
      "div",
      { class: "modal" },
      await this.childOrganism(1, null)
    );

    const comp = await createElement(
      "div",
      { className: "organism_header_list_search_button" },
      headingInputButton,
      headingList,
      modal
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data = "") => {
    await this.fn(1);
    return await component(data);
  };

  //add functions for the component here
  const listItems = async (filter) => {
    const arrayOfData = await State.items;
    let filteredData = [];

    if (filter === "") {
      filteredData = arrayOfData;
    } else {
      filteredData = [...arrayOfData].map((group) => {
        let filteredContent = group.content.filter((item) =>
          item.title.toLowerCase().includes(filter.toLowerCase())
        );

        return { header: group.header, content: filteredContent };
      });
      filteredData = filteredData.filter((group) => group.content.length > 0);
    }

    return await Promise.all(
      filteredData.map(async (item) => {
        return await this.molecule(2, item);
      })
    );
  };

  async function updateListItems(filter) {
    const existinglistItems = document.getElementById("listItems");
    existinglistItems.innerHTML = "";
    const updatedListItems = await listItems(filter);
    console.log(updatedListItems);
    existinglistItems.append(...updatedListItems);
  }

  async function openModal(data) {
    const existingModal = document.getElementById("organism_modal");
    existingModal.innerHTML = "";
    updatedModal = await this.childOrganism(1, data);
    existingModal.append(updatedModal);
  }
}
