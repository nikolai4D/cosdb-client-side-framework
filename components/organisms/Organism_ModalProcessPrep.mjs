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


    let elementsToAddModalTo = this.parent
    if (!Array.isArray(elementsToAddModalTo)) elementsToAddModalTo = [elementsToAddModalTo]
    console.log("HELLO")
    for await (const element of elementsToAddModalTo) {
        element.addEventListener("click", async (e) => {
          let modalComponent = this.organisms[0].component

            const modalId = await document.getElementById('modal-processView')

            await modalId.innerHTML = `
                <div class="test">
                    ${slot("new-modal")}
                </div>
                `

           modalComponent = await getModalContent(modalComponent, this, element, e.target)

            const modalElement = await modalComponent.getElement()
          
            console.log(modalElement)

            await this.fillSlot("new-modal", await modalElement);
        })
    }
  }
}

async function getModalContent (component, that, element, e){

  console.log(e)
    let organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeLeft = organismToModify.molecules[0].component


    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeMiddle = organismToModify.molecules[1].component

    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeRight = organismToModify.molecules[2].component


    that.moleculeMiddle.body = null;
    that.moleculeMiddle.body = element.innerHTML

  console.log(that.moleculeMiddle.body)

    if (!e.hasAttribute("getElementById")) {
    moleculeLeft.atoms[0].component.value[0].value = that.moleculeLeft.header ?? moleculeLeft.atoms[0].component.value[0].value;
    moleculeLeft.atoms[1].component.value[0].value = that.moleculeLeft.body ?? moleculeLeft.atoms[1].component.value[0].value;
    moleculeMiddle.atoms[0].component.value[0].value = that.moleculeMiddle.header ?? moleculeMiddle.atoms[0].component.value[0].value;
    moleculeMiddle.atoms[1].component.value[0].value = that.moleculeMiddle.body ?? moleculeMiddle.atoms[1].component.value[0].value;
    moleculeRight.atoms[0].component.value[0].value = that.moleculeRight.header ?? moleculeRight.atoms[0].component.value[0].value;
    moleculeRight.atoms[1].component.value[0].value = that.moleculeRight.body ?? moleculeRight.atoms[1].component.value[0].value;

    console.log(moleculeLeft.atoms[1].component.value[0].value)
    }
    else {
      let middleTextElement = e.getElementById("user-text")
      console.log(middleTextElement)
    }

    return await component
}

