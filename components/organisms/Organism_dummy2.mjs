import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_dummy1 } from "../molecules/Molecule_dummy1.mjs";

export function Organism_dummy2(parentId) {
  Component.call(this);

  this.molecules = [
    {
      molecule: "Molecule_dummy1",
      component:  new Molecule_dummy1()
    }
  ]

  this.functions = [
    {
      function: "function2",
    },
  ];

  this.getHtml = function(){

    return `
    <div>
      <div>${slot(this.molecules[0].molecule)}</div>
    </div>
  `;
  }



  this.bindScript= async function() {

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }

    console.log({parentId})

  }

}
