import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_dummy3 } from "../molecules/Molecule_dummy3.mjs";
import { Molecule_dummy4 } from "../molecules/Molecule_dummy4.mjs";

export function Organism_dummy4() {
  Component.call(this);


  this.molecules = [
    {
      molecule: "Molecule_dummy3",
      component: new Molecule_dummy3()
    },
    {
      molecule: "Molecule_dummy4",
      component: new Molecule_dummy4()

    }
  ]

  this.functions = [
    {
      function: "function1",
    },
    {
      function: "function2",
    }
  ]

  this.getHtml = function(){
  return `
  <div>
    <div>${slot(this.molecules[0].molecule)}</div>
    <div>${slot(this.molecules[1].molecule)}</div>
  </div>
`;

}

  this.bindScript= function() {

    this.molecules.forEach(mol => {
      this.fillSlot(mol.molecule, mol.component.getElement())
    })
  }



}