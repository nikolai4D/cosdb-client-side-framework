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
import { action_getRelatedParentNodes } from "../../data-mgmt/actions/action_getRelatedParentNodes.mjs";
import { action_getAllListDataWithHeaders } from "../../data-mgmt/actions/action_getAllListDataWithHeaders.mjs";
import { action_filterListItems } from "../../data-mgmt/actions/action_filterListItems.mjs";

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
      function: "action_getAllListDataWithHeaders",
      component: action_getAllListDataWithHeaders,
    },
    {
      id: 2,
      function: "action_filterListItems",
      component: action_filterListItems,
    },
  ]

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
      ...(await filterData(compData))
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

  //add component specific functions here

const filterData = async (filter = "") => { //OK
  const filteredData = await this.fn(2, filter)
  return Promise.all(filteredData.map(item => this.molecule(2, item)));
}

  async function updateListItems(filter) { //OK
    const existinglistItems = document.getElementById("listItems");
    existinglistItems.innerHTML = "";
    const updatedListItems = await filterData(filter);
    existinglistItems.append(...updatedListItems);
  }

  // current

  const openModal = async (id) => {
    //create modal content
    const existingModal = document.getElementById("organism_modal");

    //create modal content

    if(id === "new") {
      await createForm(existingModal);
    } else {
      const modalConnetionsContent = await createElement("div",
      {
        class: "organism_modal_content",
        id: `organism_modal_content_${id}`,
      },
      await this.childOrganism(2, id)
    );
      existingModal.appendChild(modalConnetionsContent);
    }

    //modal content created and next step to display modal
    existingModal.style.display = "block"; // Show the modal
  };


  // const newObject = async (existingModalContent) => {
  //   existingModalContent.innerHTML = "";
  //   console.log("State ParentIds", State.parentIds);

  //   await createForm(existingModalContent);
  // };

  async function createForm(existingModal) {
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

    const existingModalContent = document.createElement("div");
    existingModalContent.appendChild(divInputAndButton);
    //existingModalContent.style.removeProperty("width");
    //existingModalContent.style.removeProperty("height");
    existingModal.appendChild(existingModalContent)

  }

  async function handleCreate() {
    const selectedParent = document.getElementById(
      "parentSelectNewObject"
    ).value;
    const inputFieldValue = document.getElementById(
      "inputFieldNewObject"
    ).value;

    if (inputFieldValue === "") {
      alert("Input cannot be empty!");
      return;
    }
    await createData(selectedParent, inputFieldValue);
  }

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

  // next step
  const handleModal = async (e) => {
    const existingModal = document.querySelector(".organism_modal");
    console.log(existingModal);

    //Add related nodes
    if (
      e.target.className.includes("addInternalRelTo") ||
      e.target.className.includes("addExternalRelTo") ||
      e.target.className.includes("addInternalRelFrom") ||
      e.target.className.includes("addExternalRelFrom")
    ) {
      await handleAddRel(e.target, existingModal);
    }

    //delet related node
    if (e.target.className.includes("deleteRel")) {
      if (window.confirm("Ta bort?")) {
        console.log(e.target.parentNode.childNodes[1].id);
        const relId = e.target.parentNode.childNodes[1].id;
        let urlKey = "";
        if (relId.startsWith("tdir")) {
          urlKey = "typeDataInternalRel";
        }
        if (relId.startsWith("tder")) {
          urlKey = "typeDataExternalRel";
        }
        const url = `api/deleteById/${urlKey}/${relId}`;
        const deletedRel = await apiCallGet(url);
        console.log(deletedRel);

        const currentModalId = existingModal.firstChild.id;
        const prefix = "organism_modal_content_";
        const currentId = currentModalId.substring(
          currentModalId.indexOf(prefix) + prefix.length
        );
        console.log(currentId);

        existingModal.style.display = "none"; // Hide the modal
        // Remove all divs with the class "organism_modal_content" and their children
        const modalContents = existingModal.querySelectorAll(
          ".organism_modal_content"
        );
        modalContents.forEach((modalContent) => {
          modalContent.innerHTML = "";
          modalContent.remove();
        });

        await openModal(currentId);
      }
    }

    //Update modal content
    if (e.target.className.includes("modalEdit")) {
      await handleUpdate(existingModal);
    }
    if (e.target.className.includes("modalDelete")) {
      if (window.confirm("Ta bort?")) {
        await handleDelete(existingModal);
      }
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
      await updateListItems("");
    }
  };

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

    const paragraph = existingModal.querySelector(
      `#${pId}[class*="atom_paragraphdata"]`
    );

    console.log(paragraph);

    // Create an input element
    const input = document.createElement("input");
    input.classList.add("atom_input");
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
    saveButton.addEventListener("click", async () => {
      if (input.value === "") {
        alert("Input cannot be empty!");
        return;
      }
      // Create a new paragraph element
      const newParagraph = document.createElement("p");
      newParagraph.classList.add("atom_paragraphdata");
      newParagraph.id = pId;
      newParagraph.textContent = input.value;

      // Replace the input element and save button with the new paragraph element
      input.replaceWith(newParagraph);
      saveButton.remove();

      // Update the data
      await updateData(pId, input.value);
    });
  }

  async function updateData(id, inputValue) {
    const getParentIdUrl = `api/getById/type/${id}`;
    const idObject = await apiCallGet(getParentIdUrl);
    const parentId = idObject.parentId;

    console.log("State", State);
    console.log({ parentId, inputValue });

    const url = `api/update/type`;

    const body = { title: inputValue, id, parentId, props: [] };
    const updatedItem = await apiCallPost({ url, body });
    console.log(updatedItem);

    for (const section of State.items) {
      const itemInState = section.content.find(
        (item) => item.id === updatedItem.id
      );
      if (itemInState) {
        itemInState.title = updatedItem.title;
      }
    }
  }
  async function handleDelete(existingModal) {
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

    // Update the data
    await deleteData(pId);

    existingModal.style.display = "none"; // Hide the modal
    // Remove all divs with the class "organism_modal_content" and their children
    const modalContents = existingModal.querySelectorAll(
      ".organism_modal_content"
    );
    modalContents.forEach((modalContent) => {
      modalContent.innerHTML = "";
      modalContent.remove();
    });
    await updateListItems("");
  }

  async function deleteData(id) {
    const url = `api/deleteById/type/${id}`;

    const deletedItem = await apiCallGet(url);
    console.log(deletedItem);

    for (const section of State.items) {
      section.content = section.content.filter((item) => item.id !== id);
    }
    console.log(State.items);
  }

  async function handleAddRel(eTarget, existingModal) {
    console.log(existingModal);
    console.log(eTarget);
    const objectId = eTarget.offsetParent.id;
    const prefix = "organism_modal_content_";
    const objId = objectId.substring(objectId.indexOf(prefix) + prefix.length);
    console.log(objId);

    //get ParentId
    const getParentIdUrl = `api/getById/type/${objId}`;
    const idObject = await apiCallGet(getParentIdUrl);
    const parentId = idObject.parentId;

    //get Nodes related to parent
    const relatedParentNodes = await action_getRelatedParentNodes(parentId);
    console.log(relatedParentNodes);

    //show dropdown with valid parents

    let modalContent = "";
    let parentItems = "";
    let urlRelKey = "";
    let relDirection = "";

    if (eTarget.className.includes("addInternalRelTo")) {
      modalContent = existingModal.querySelector(
        ".organism_modalconnections__content__connectiontopleft"
      );
      parentItems = relatedParentNodes.internalRelsToNode;
      urlRelKey = "typeDataInternalRel";
      relDirection = "to";
    }
    if (eTarget.className.includes("addInternalRelFrom")) {
      modalContent = existingModal.querySelector(
        ".organism_modalconnections__content__connectiontopright"
      );
      parentItems = relatedParentNodes.internalRelsFromNode;
      urlRelKey = "typeDataInternalRel";
      relDirection = "from";
    }
    if (eTarget.className.includes("addExternalRelTo")) {
      modalContent = existingModal.querySelector(
        ".organism_modalconnections__content__connectionbottomleft"
      );
      parentItems = relatedParentNodes.externalRelsToNode;
      urlRelKey = "typeDataExternalRel";
      relDirection = "to";
    }
    if (eTarget.className.includes("addExternalRelFrom")) {
      modalContent = existingModal.querySelector(
        ".organism_modalconnections__content__connectionbottomright"
      );
      parentItems = relatedParentNodes.externalRelsFromNode;
      urlRelKey = "typeDataExternalRel";
      relDirection = "from";
    }

    const modalContentItems = modalContent.querySelector(
      ".molecule_modalconnection__items"
    );
    //add a dropdown to modalContentItems with valid options from parentItems object.node.title

    // Create a select element (dropdown)
    const parentDropdown = document.createElement("select");
    parentDropdown.classList.add("molecule_modalconnection__dropdown");

    // Create a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Välj Parent";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    parentDropdown.appendChild(defaultOption);

    // Iterate through parentItems to add options to the dropdown
    parentItems.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.node.id;
      option.text = item.node.title;
      parentDropdown.appendChild(option);
    });

    // Append the dropdown to modalContentItems
    modalContentItems.insertBefore(
      parentDropdown,
      modalContentItems.firstChild
    );

    // Add event listener to handle dropdown change
    parentDropdown.addEventListener("change", async (e) => {
      // Handle the selection change here
      console.log("Selected node:", e.target.value);
      const existingChildrenDropdown =
        document.getElementById("childrenDropdown");
      if (existingChildrenDropdown) {
        existingChildrenDropdown.remove();
      }
      const existingAddButton = document.getElementById("addRelButton");
      if (existingAddButton) {
        existingAddButton.remove();
      }

      //Get parent rel
      const parentObj = parentItems.find(
        (item) => item.node.id === e.target.value
      );
      const parentRel = parentObj.rel;
      console.log("parentRel", parentRel);

      const childrenObejcts = await apiCallGet(`api/type/${e.target.value}`);
      console.log("childrenObejcts", childrenObejcts);

      // Create a select element (dropdown)
      const childrenDropdown = document.createElement("select");
      childrenDropdown.classList.add("molecule_modalconnection__dropdown");
      childrenDropdown.id = "childrenDropdown";

      // Create a default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Välj Parent";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      childrenDropdown.appendChild(defaultOption);

      // Iterate through parentItems to add options to the dropdown
      childrenObejcts.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.title;
        childrenDropdown.appendChild(option);
      });

      childrenDropdown.addEventListener("change", async (e) => {
        const existingAddButton = document.getElementById("addRelButton");
        if (!existingAddButton) {
          // Create a button to add the relationship
          const addButton = document.createElement("button");
          addButton.textContent = "Skapa rel";
          addButton.id = "addRelButton";
          addButton.addEventListener("click", async (e) => {
            const selectedChild = childrenDropdown.value;
            const relTitle = parentRel.title;
            const relParentId = parentRel.id;
            const currentNode = objId;
            // Use the selectedParent and selectedChild values to add the relationship here
            console.log(selectedChild, currentNode, relTitle, relParentId);

            const url = `api/createRel/${urlRelKey}`;
            let relSource = "";
            let relTarget = "";
            if (relDirection === "to") {
              relSource = selectedChild;
              relTarget = currentNode;
            }

            if (relDirection === "from") {
              relSource = currentNode;
              relTarget = selectedChild;
            }

            const body = {
              title: relTitle,
              parentId: relParentId,
              props: [],
              target: relTarget,
              source: relSource,
            };

            const newRel = await apiCallPost({ url, body });
            console.log(newRel);
            if (newRel.error) {
              alert("Det går inte att skapa relation till sig själv");
              return;
            }

            existingModal.style.display = "none"; // Hide the modal
            // Remove all divs with the class "organism_modal_content" and their children
            const modalContents = existingModal.querySelectorAll(
              ".organism_modal_content"
            );
            modalContents.forEach((modalContent) => {
              modalContent.innerHTML = "";
              modalContent.remove();
            });

            await openModal(objId);
          });
          childrenDropdown.insertAdjacentElement("afterend", addButton);
        }
      });

      parentDropdown.insertAdjacentElement("afterend", childrenDropdown);
    });

    //add rel to modal
    //update State
  }
}
