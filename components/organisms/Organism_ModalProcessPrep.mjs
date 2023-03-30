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
  

  this.bindScript = async function () {

    let modalComponent = this.organisms[0].component

    let elementsToAddModalTo = this.parent
    if (!Array.isArray(elementsToAddModalTo)) elementsToAddModalTo = [elementsToAddModalTo]
    
    for await (const element of elementsToAddModalTo) {
        element.addEventListener("click", async (e) => {

            const modalId = document.getElementById('modal-processView')

            modalId.innerHTML = `
                <div>
                    ${slot("new-modal")}
                </div>
                `

           modalComponent = await getModalContent(modalComponent, this, element.innerHTML)

            const modalElement = await modalComponent.getElement()
          
            console.log(modalElement)

            this.fillSlot("new-modal", modalElement);
        })
    }
    }
}

async function getModalContent (component, that, element){

  console.log(element)
    let organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeLeft = organismToModify.molecules[0].component


    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeMiddle = organismToModify.molecules[1].component

    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeRight = organismToModify.molecules[2].component


    that.moleculeMiddle.body = null;
    that.moleculeMiddle.body = element

    let middleTextElement = element.getElementById("user-text")
    console.log(middleTextElement)
    moleculeLeft.atoms[0].component.value[0].value = that.moleculeLeft.header ?? moleculeLeft.atoms[0].component.value[0].value;
    moleculeLeft.atoms[1].component.value[0].value = that.moleculeLeft.body ?? moleculeLeft.atoms[1].component.value[0].value;
    moleculeMiddle.atoms[0].component.value[0].value = that.moleculeMiddle.header ?? moleculeMiddle.atoms[0].component.value[0].value;
    moleculeMiddle.atoms[1].component.value[0].value = that.moleculeMiddle.body ?? moleculeMiddle.atoms[1].component.value[0].value;
    moleculeRight.atoms[0].component.value[0].value = that.moleculeRight.header ?? moleculeRight.atoms[0].component.value[0].value;
    moleculeRight.atoms[1].component.value[0].value = that.moleculeRight.body ?? moleculeRight.atoms[1].component.value[0].value;


    return await component
}

