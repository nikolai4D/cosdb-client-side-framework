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

           modalComponent = await getModalContent(modalComponent, this, e)

        //    let organismToModify = this.organisms[0].component.organisms[0].component.organisms[0].component
        //    let moleculeLeft = organismToModify.molecules[0].component
        //    let moleculeLeftHeader = moleculeLeft.atoms[0].component.value[0].value
        //    let moleculeLeftBody = moleculeLeft.atoms[1].component.value[0].value
       
        //    let moleculeMiddle = organismToModify.molecules[1].component
        //    let moleculeMiddleHeader = moleculeMiddle.atoms[0].component.value[0].value
        //    let moleculeMiddleBody = moleculeMiddle.atoms[1].component.value[0].value
       
        //    let moleculeRight = organismToModify.molecules[2].component
        //    let moleculeRightHeader = moleculeRight.atoms[0].component.value[0].value
        //    let moleculeRightBody = moleculeRight.atoms[1].component.value[0].value
        //    //moleculeLeftBody
        //    moleculeLeft.atoms[1].component.value[0].value = "Hello"
            // modifyMolecule(molecule, this)
            const modalElement = await modalComponent.getElement()
            console.log(this.organisms[0].component, "component")

            console.log(modalElement, "modalelement")
            this.fillSlot("new-modal", modalElement);
        })
    }
    }
}

async function getModalContent (component, that, e){

  console.log(e)
    let organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeLeft = organismToModify.molecules[0].component
    // let moleculeLeftHeader = moleculeLeft.atoms[0].component.value[0].value
    moleculeLeft.atoms[0].component.value[0].value = "header"
    // let moleculeLeftBody = moleculeLeft.atoms[1].component.value[0].value
    moleculeLeft.atoms[1].component.value[0].value = "heeello"

    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeMiddle = organismToModify.molecules[1].component
    // let moleculeMiddleHeader = moleculeMiddle.atoms[0].component.value[0].value
    moleculeMiddle.atoms[0].component.value[0].value = "middle"
    // let moleculeMiddleBody = moleculeMiddle.atoms[1].component.value[0].value
    moleculeMiddle.atoms[1].component.value[0].value = "middle2"

    organismToModify = component.organisms[0].component.organisms[0].component
    let moleculeRight = organismToModify.molecules[2].component
    // let moleculeRightHeader = moleculeRight.atoms[0].component.value[0].value
    moleculeRight.atoms[0].component.value[0].value = "rightheader"
    // let moleculeRightBody = moleculeRight.atoms[1].component.value[0].value
    moleculeRight.atoms[1].component.value[0].value = "rightbody"
    // moleculeLeftBody = "Hello"

    // console.log({moleculeLeft, moleculeMiddle, moleculeRight, moleculeLeftHeader, moleculeMiddleHeader, moleculeMiddleBody, moleculeRight, moleculeRightHeader, moleculeRightBody})
    // console.log(that.moleculeLeft, that.moleculeMiddle, that.moleculeRight)

    // that.moleculeLeft.header ? moleculeLeftHeader = that.moleculeLeft.header : moleculeLeftHeader = moleculeLeftHeader;
    // that.moleculeLeft.body ? moleculeLeftBody = that.moleculeLeft.body : null;
    // that.moleculeMiddle.header ? moleculeMiddleHeader = that.moleculeMiddle.header : null;
    // that.moleculeMiddle.body ? moleculeMiddleBody = that.moleculeMiddle.body : null;
    // that.moleculeRight.header ? moleculeRightHeader = that.moleculeRight.header : null;
    // that.moleculeRight.body ? moleculeRightBody = that.moleculeRight.body : null;

    moleculeLeft.atoms[0].component.value[0].value = that.moleculeLeft.header ?? moleculeLeft.atoms[0].component.value[0].value;
    moleculeLeft.atoms[1].component.value[0].value = that.moleculeLeft.body ?? moleculeLeft.atoms[1].component.value[0].value;
    moleculeMiddle.atoms[0].component.value[0].value = that.moleculeMiddle.header ?? moleculeMiddle.atoms[0].component.value[0].value;
    moleculeMiddle.atoms[1].component.value[0].value = that.moleculeMiddle.body ?? moleculeMiddle.atoms[1].component.value[0].value;
    moleculeRight.atoms[0].component.value[0].value = that.moleculeRight.header ?? moleculeRight.atoms[0].component.value[0].value;
    moleculeRight.atoms[1].component.value[0].value = that.moleculeRight.body ?? moleculeRight.atoms[1].component.value[0].value;

    // console.log({moleculeLeft, moleculeMiddle, moleculeRight, moleculeLeftHeader, moleculeLeftBody, moleculeMiddleHeader, moleculeMiddleBody, moleculeRight, moleculeRightHeader, moleculeRightBody})
    // console.log(that.moleculeLeft, that.moleculeMiddle, that.moleculeRight)

    // return {moleculeLeft, moleculeMiddle, moleculeRight}
    return await component
}

// const modifyMolecule = (molecule, ) => {
//     const {moleculeLeft, moleculeMiddle, moleculeRight} = molecule
//     console.log(molecule, that)
    
//     // moleculeLeft.functions[0].function = "placeholder"
//     // moleculeMiddle.functions[0].function = "placeholder"
//     // moleculeRight.functions[0].function = "placeholder"
// }