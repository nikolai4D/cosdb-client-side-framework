 //import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
import { State } from "../../data-mgmt/State.mjs";
//import sub components
import { Molecule_Dropdown_Input_Button } from "../molecules/Molecule_Dropdown_Input_Button.mjs";
import { apiCallPost } from "../../data-mgmt/actions/apiCalls.mjs";


export function Organism_Modal_Dropdown_Input_Button() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Dropdown_Input_Button",
      component: new Molecule_Dropdown_Input_Button(),
    },

  ];

  this.functions = [


  ];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "organism_modal_dropdown_input_button" },
      await this.molecule(1, compData)
    );

    //add event listener to the comp here
    comp.addEventListener("click", async (e) => {
      if(e.target.tagName === "BUTTON"){
        await handleCreate();
      }
    })

    return comp;
  };

  //render component
  this.render = async (data = ["option1", "option2"]) => {
    return await component(data);
  };

  //add component specific functions here

  async function handleCreate() {
 
    const selectedParent = document.getElementById(
      "parentSelectNewObject"
    ).id;
    const inputFieldValue = document.getElementById(
      "inputFieldNewObject"
    ).value;

    console.log("selectedParent befor",selectedParent)

    console.log("inputFieldValue befor",inputFieldValue)

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
   
  }


}
