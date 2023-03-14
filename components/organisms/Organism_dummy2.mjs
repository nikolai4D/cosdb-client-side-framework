import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_dummy1 } from "../molecules/Molecule_dummy1.mjs";
import { State } from "../../State.mjs";

export function Organism_dummy2(parentId) {
  Component.call(this);

  this.molecules = [
    {
      molecule: "Molecule_dummy1",
      component: (param) => new Molecule_dummy1(param)
    }
  ]

  this.functions = [
    {
      function: "function2",
    },
  ];

  this.getHtml = async function(){

    return `
    <div>
      <div>${slot(this.molecules[0].molecule)}</div>
    </div>
  `;
  }

  this.bindScript= async function() {

    const state = await State
    const organisms = state.model.organisms
    const id = organisms.find(org => org.parentId === parentId).id

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component(id).getElement())
    }
  }

}
