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

    const modalComponent = this.organisms[0].component
    const modalElement = modalComponent.getElement()

    let elementsToAddModalTo = this.parent
    if (!Array.isArray(elementsToAddModalTo)) elementsToAddModalTo = [elementsToAddModalTo]
    
    for (const element of elementsToAddModalTo) {
        element.addEventListener("click", (e) => {
            const modalId = document.getElementById('modal-processView')

            modalId.innerHTML = `
                <div>
                    ${slot("new-modal")}
                </div>
                `

            getModalContent(modalComponent, that)
            // modifyMolecule(molecule, this)

            this.fillSlot("new-modal", modalElement);
        })
    }
    }
}

const getModalContent = (component, that) => {
    const organismToModify = component.organisms[0].component.organisms[0].component
    const moleculeLeft = organismToModify.molecules[0].component
    const moleculeLeftHeader = moleculeLeft.atoms[0]
    const moleculeLeftBody = moleculeLeft.atoms[1]

    const moleculeMiddle = organismToModify.molecules[1].component
    const moleculeMiddleHeader = moleculeMiddle.atoms[0]
    const moleculeMiddleBody = moleculeMiddle.atoms[1]

    const moleculeRight = organismToModify.molecules[2].component
    const moleculeRightHeader = moleculeRight.atoms[0]
    const moleculeRightBody = moleculeRight.atoms[1]

    that.moleculeLeft.header ? moleculeLeft.atoms[0]



    // return {moleculeLeft, moleculeMiddle, moleculeRight}
}

// const modifyMolecule = (molecule, ) => {
//     const {moleculeLeft, moleculeMiddle, moleculeRight} = molecule
//     console.log(molecule, that)
    
//     // moleculeLeft.functions[0].function = "placeholder"
//     // moleculeMiddle.functions[0].function = "placeholder"
//     // moleculeRight.functions[0].function = "placeholder"
// }