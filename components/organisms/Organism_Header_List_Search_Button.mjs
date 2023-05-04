//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Heading_List } from "../molecules/Molecule_Heading_List.mjs";
import { Molecule_Heading_Input_Button } from "../molecules/Molecule_Heading_Input_Button.mjs";

import { Organism_ModalConnections } from "./Organism_ModalConnections.mjs";
//import state
import { State } from "../../data-mgmt/State.mjs";

export function Organism_Header_List_Search_Button() {
  Organism.call(this);

  // sub components
  this.organisms = [
    {
      id: 2,
      organism: "Organism_ModalConnections",
      component: new Organism_ModalConnections(),
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
      { class: "organism_heading_input_button" },
      await this.molecule(1, null)
    );
    headingInputButton.addEventListener("input", async (e) => {
      await updateListItems(e.target.value);
    });
    headingInputButton.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        const modalContent = "Add new item click";
        await openModal(modalContent);
      }
    });

    const headingList = await createElement(
      "div",
      { class: "organism_heading_list", id: "listItems" },
      ...(await listItems(compData))
    );
    headingList.addEventListener("click", async (e) => {
      if (e.target.tagName === "LI") {
        await openModal(e.target.id);
      }
    });

    const modal = await createElement("div", {
      class: "organism_modal",
      id: "organism_modal",
    });

    const comp = await createElement(
      "div",
      { className: "organism_header_list_search_button" },
      headingInputButton,
      headingList,
      modal
    );

    //add event listener to the comp here

    comp.addEventListener("click", closeModal);

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
    console.log(arrayOfData);
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
    existinglistItems.append(...updatedListItems);
  }

  const openModal = async (id) => {
    const existingModal = document.getElementById("organism_modal");
    let existingModalContent = document.getElementById(
      "organism_modal_content"
    );

    if (!existingModalContent) {
      existingModalContent = await createElement(
        "div",
        {
          class: "organism_modal_content",
          id: `organism_modal_content_${id}`,
        },
        await this.childOrganism(2, id)
      );
      existingModal.appendChild(existingModalContent);
    } else {
      existingModalContent.innerHTML = "";
    }

    existingModal.style.display = "block"; // Show the modal
  };

  const closeModal = async (e) => {
    const existingModal = document.querySelector(".organism_modal");

    if (e.target.className.includes("relHeaderId")) {
      const newModalContent = await createElement(
        "div",
        {
          class: "organism_modal_content",
          id: `organism_modal_content_${e.target.id}`,
        },
        await this.childOrganism(2, e.target.id)
      );
      //   existingModal.firstChild.style.display = "none"; // Hide the previous content
      existingModal.appendChild(newModalContent); // Add the new content
    }

    if (e.target.className.includes("CloseModalBackButton")) {
      console.log(e.target.parentElement.id);
      const currentModalContent = document.getElementById(
        `organism_modal_content_${e.target.parentElement.id}`
      );

      currentModalContent.innerHTML = ""; // Remove the content
      currentModalContent.remove(); // Remove the content

      const modalContents = existingModal.querySelectorAll(
        ".organism_modal_content"
      );

      if (modalContents.length === 0) {
        existingModal.style.display = "none";
      }
    }

    if (e.target === existingModal) {
      existingModal.style.display = "none"; // Hide the modal
      // Remove all divs with the class "organism_modal_content" and their children
      const modalContents = existingModal.querySelectorAll(
        ".organism_modal_content"
      );
      modalContents.forEach((modalContent) => {
        modalContent.innerHTML = "";
        modalContent.remove();
      });
    }
  };
}
