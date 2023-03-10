import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy4 } from "./Organism_dummy4.mjs";
import { Molecule_dummy3 } from "../molecules/Molecule_dummy3.mjs";
import { Molecule_dummy4 } from "../molecules/Molecule_dummy4.mjs";

export function Organism_dummy3() {
  Component.call(this);

  this.organisms = [
    {
      organism: "Organism_dummy41",
      component: new Organism_dummy4()
    },
    {
      organism: "Organism_dummy42",
      component: new Organism_dummy4()
    }
  ]

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
  ];


  this.getHtml = function(){
  return `
  <div>
    <div>${this.organisms[0].organism}</div>
    <div>${this.organisms[1].organism}</div>
    <div>${this.molecules[0].molecule}</div>
    <div>${this.molecules[1].molecule}</div>
  </div>
`;
}

this.bindScript= function() {

  this.organisms.forEach(org => {
    this.fillSlot(org.organism, org.component.getElement())
  })

  this.molecules.forEach(mol => {
    this.fillSlot(mol.molecule, mol.component.getElement())
  })
}

}
