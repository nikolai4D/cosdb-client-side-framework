import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_dummy2 } from "../molecules/Molecule_dummy2.mjs";
import { State } from "../../State.mjs";

export function Organism_dummy2() {
  Component.call(this);

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_dummy2",
      component: new Molecule_dummy2()
    }
  ]

  this.functions = [{ id: 1, function1: "placeholder" }];

  this.getHtml = function(){

    return `
    <div>
      <div>${slot(this.molecules[0].molecule)}</div>
    </div>
  `;
  }

  this.bindScript= async function() {

    // const state = await State
    // const organisms = state.model.organisms
    // const id = organisms.find(org => org.parentId === parentId).id

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
  }

}
