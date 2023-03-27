import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Organism_ModalProcess } from "./Organism_ModalProcess.mjs";

export function Organism_ModalProcessPrep() {
  Component.call(this);

  this.organisms = [
    {
        id: 1,
        organism: "Organism_ModalProcess",
        component: new Organism_ModalProcess()
    }
    ]

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
    {
      id: 2,
      function: "placeholder",
    },
  ];

  this.parent = [];

  this.getHtml = function () {
    return `
        <div id="modal-processView"></div>
    `;
  };
  

  this.bindScript = async function () {

    let component = this.organisms[0].component.getElement()
    console.log(this.parent);
    let elementsArray = this.parent
    // let elementsArray =[];
    console.log(elementsArray, "elementsArray");

    if (elementsArray.length === 0) elementsArray = [document.getElementById("organism_all_lists")]

    elementsArray.forEach(element => {
        element.addEventListener("click", (e) => {

      const modalId = document.getElementById('modal-processView')

      modalId.innerHTML = `
          <div>
              ${slot("new-modal")}
          </div>
          `
      this.fillSlot("new-modal", component);
        })})
}
}