import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";
import { State } from "../../State.mjs";
// import { State } from "../../data-mgmt/State.mjs";
import { Molecule_dummy1 } from "../molecules/Molecule_dummy1.mjs";
import { Molecule_dummy2 } from "../molecules/Molecule_dummy2.mjs";

export function Organism_dummy1() {
  Component.call(this);

  this.organisms = [
    { 
      organism: "Organism_dummy2",
      component:  new Organism_dummy2()
    }
  ]

  this.molecules = [
    {
      molecule1: "Molecule_dummy1",
      component: new Molecule_dummy1()
    },
    {
      molecule2: "Molecule_dummy2",
      component: new Molecule_dummy2()
    },
  ];

  this.functions = [
    {
      function: "function1",
    },
    {
      function: "function2",
    },
  ];

  this.getHtml = function(){
    return `<div class="organism_dummy1">
            <div class="organism_dummy1_1">${slot(this.organisms[0].organism)}</div>
            <div>${slot(this.molecules[0].molecule)}</div>
            <div>${slot(this.molecules[1].molecule)}</div>

          </div>
        `;
      }

  this.bindScript= async function() {

    // const state = await State
    // const organisms = state.model.organisms
    // const id = organisms.find(org => org.parentId === parentId).id

    for (let org of this.organisms) {
      await this.fillSlot(org.organism, org.component.getElement())
    }
  }
}
