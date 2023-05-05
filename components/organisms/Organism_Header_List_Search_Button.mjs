//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_Heading_List } from "../molecules/Molecule_Heading_List.mjs";
import { Molecule_Heading_Input_Button } from "../molecules/Molecule_Heading_Input_Button.mjs";

import { Organism_ModalConnections } from "./Organism_ModalConnections.mjs";
//import state
import { State } from "../../data-mgmt/State.mjs";
import { apiCallGet } from "../../data-mgmt/actions/apiCalls.mjs";
import { apiCallPost } from "../../data-mgmt/actions/apiCalls.mjs";

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
        await openModal("new");
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

    comp.addEventListener("click", handleModal);

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
    //create modal content
    const existingModal = document.getElementById("organism_modal");
    let existingModalContent = document.getElementById(
      "organism_modal_content"
    );
    let existingId = "";

    if (id === "new") {
      existingId = null;
    } else {
      existingId = id;
    }

    if (!existingModalContent) {
      existingModalContent = await createElement(
        "div",
        {
          class: "organism_modal_content",
          id: `organism_modal_content_${id}`,
        },

        await this.childOrganism(2, existingId)
      );
      existingModal.appendChild(existingModalContent);
    } else {
      existingModalContent.innerHTML = "";
    }

    if (id === "new") {
      await newObject(existingModalContent);
    }

    existingModal.style.display = "block"; // Show the modal
  };

  const handleModal = async (e) => {
    const existingModal = document.querySelector(".organism_modal");

    console.log(e.target);

    //Update modal content
    if (e.target.className.includes("modalEdit")) {
      await handleUpdate(existingModal);
    }

    //Navigate forward
    if (e.target.className.includes("relHeaderId")) {
      const newModalContent = await createElement(
        "div",
        {
          class: "organism_modal_content",
          id: `organism_modal_content_${e.target.id}`,
        },
        await this.childOrganism(2, e.target.id)
      );

      existingModal.appendChild(newModalContent); // Add the new content
    }

    //Navigate back
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

    //Close modal
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
  const newObject = async (existingModalContent) => {
    existingModalContent.innerHTML = "";
    console.log("State ParentIds", State.parentIds);

    await createForm(existingModalContent);
  };

  async function createData(parentId, inputValue) {
    console.log("State", State);
    console.log({ parentId, inputValue });

    const url = `api/create/type`;

    const body = { title: inputValue, parentId, props: [] };
    const newItem = await apiCallPost({ url, body });

    const newItemHeaderFirst = newItem.title.charAt(0).toLowerCase();

    const existingItem = State.items.find(
      (item) => item.header.toLowerCase() === newItemHeaderFirst
    );

    if (existingItem) {
      existingItem.content.push(newItem);
      existingItem.content.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      const newSection = {
        header: newItemHeaderFirst,
        content: [newItem],
      };
      State.items.push(newSection);
    }

    await updateListItems("");

    const newObjectModal = document.querySelector(".organism_modal");
    newObjectModal.style.display = "none"; // Hide the modal
    // Remove all divs with the class "organism_modal_content" and their children
    const modalContents = newObjectModal.querySelectorAll(
      ".organism_modal_content"
    );
    modalContents.forEach((modalContent) => {
      modalContent.innerHTML = "";
      modalContent.remove();
    });
  }

  async function handleCreate() {
    const selectedParent = document.getElementById(
      "parentSelectNewObject"
    ).value;
    const inputFieldValue = document.getElementById(
      "inputFieldNewObject"
    ).value;
    await createData(selectedParent, inputFieldValue);
  }

  async function createForm(existingModalContent) {
    const parents = State.parentIds;

    const parentsList = [];

    for (const parent of parents) {
      const url = `api/getById/object/${parent}`;
      try {
        const data = await apiCallGet(url);

        if (Array.isArray(data)) {
          parentsList.push(...data);
        } else {
          parentsList.push(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Create the div
    const divInputAndButton = document.createElement("div");
    divInputAndButton.classList.add("molecule_createObjectInputAndButton");

    // Create and append the select
    const select = document.createElement("select");
    select.id = "parentSelectNewObject";
    select.classList.add("atom_input");
    parentsList.forEach(async (parent) => {
      const parentTitle = parent.title;
      const option = document.createElement("option");
      option.value = parent.id;
      option.textContent = parentTitle; //`Parent ${id}`;
      select.appendChild(option);
    });
    divInputAndButton.appendChild(select);

    // Create and append the input field
    const inputField = document.createElement("input");
    inputField.classList.add("atom_input");
    inputField.type = "text";
    inputField.placeholder = "";
    inputField.id = "inputFieldNewObject";
    divInputAndButton.appendChild(inputField);

    // Create and append the button
    const button = document.createElement("button");
    button.classList.add("atom_buttonpositive");

    button.textContent = "Skapa";
    button.addEventListener("click", handleCreate);
    divInputAndButton.appendChild(button);

    existingModalContent.appendChild(divInputAndButton);
    existingModalContent.style.removeProperty("width");
    existingModalContent.style.removeProperty("height");
  }

  async function handleUpdate(existingModal) {
    // Get the paragraph element
    const currentModalContent = existingModal.querySelector(
      ".organism_modal_content"
    );

    const paragraphId = currentModalContent.id;

    const prefix = "organism_modal_content_";
    const pId = paragraphId.substring(
      paragraphId.indexOf(prefix) + prefix.length
    );
    console.log(pId);

    const paragraph = document.getElementById(pId);
    console.log(paragraph);

    // Create an input element
    const input = document.createElement("input");
    input.classList.add("value", "atom_input");
    input.id = pId;
    input.type = "text";
    input.value = paragraph.textContent;

    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.classList.add("atom_buttonpositive");
    saveButton.textContent = "Spara";

    // Replace the paragraph element with the input element and save button
    paragraph.replaceWith(input, saveButton);

    // Add event listener to the save button
    saveButton.addEventListener("click", () => {
      // Create a new paragraph element
      const newParagraph = document.createElement("p");
      newParagraph.classList.add("atom_paragraphdata");
      newParagraph.id = pId;
      newParagraph.textContent = input.value;

      // Replace the input element and save button with the new paragraph element
      input.replaceWith(newParagraph);
      saveButton.remove();
    });
  }
}
