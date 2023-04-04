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

  this.moleculeLeft = {header: null, body: null};
  this.moleculeMiddle = {header: null, body: null};
  this.moleculeRight = {header: null, body: null};

  this.getHtml = function () {
    return `
        <div id="modal-processView"></div>
    `;
  };
  

  this.bindScript =  function () {


    let elementsToAddModalTo = this.parent
    if (!Array.isArray(elementsToAddModalTo)) elementsToAddModalTo = [elementsToAddModalTo]
    for  (const element of elementsToAddModalTo) {
        element.addEventListener("click",  (e) => {

            const modalId =  document.getElementById('modal-processView')

           modalId.innerHTML = `
                <div class="test">
                    ${slot("new-modal")}
                </div>
                `

            let component = new Organism_ModalProcess()

              getModalContent(component, this, element)
            const modalElement =  component.getElement()
          
             this.fillSlot("new-modal",  modalElement);
        })
    }
  }
}

 function getModalContent (component, that, element){

    let organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeLeft = organismToModify.molecules[0].component


    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeMiddle = organismToModify.molecules[1].component

    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeRight = organismToModify.molecules[2].component


    that.moleculeMiddle.body = null;
    that.moleculeMiddle.body = element.innerHTML


    moleculeLeft.atoms[0].component.value[0].value = that.moleculeLeft.header ?? moleculeLeft.atoms[0].component.value[0].value;
    moleculeLeft.atoms[1].component.value[0].value = that.moleculeLeft.body ?? moleculeLeft.atoms[1].component.value[0].value;
    moleculeMiddle.atoms[0].component.value[0].value = that.moleculeMiddle.header ?? moleculeMiddle.atoms[0].component.value[0].value;
    moleculeMiddle.atoms[1].component.value[0].value = that.moleculeMiddle.body ?? moleculeMiddle.atoms[1].component.value[0].value;
    moleculeRight.atoms[0].component.value[0].value = that.moleculeRight.header ?? moleculeRight.atoms[0].component.value[0].value;
    moleculeRight.atoms[1].component.value[0].value = that.moleculeRight.body ?? moleculeRight.atoms[1].component.value[0].value;

    const moleculeMiddleBody = moleculeMiddle.atoms[1].component.value[0].value
    if (moleculeMiddleBody.includes("Erhållit beställning för start byggnationsprocess (D) (0.1.1)"))
    {
      moleculeLeft.atoms[1].component.value[0].value = "Beställning"
      moleculeRight.atoms[1].component.value[0].value = "-"
    }

    return component
}

