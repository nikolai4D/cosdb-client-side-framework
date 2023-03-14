import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";
import { State } from "../../State.mjs";
// import { State } from "../../data-mgmt/State.mjs";


export function Organism_dummy1(parentId) {
  Component.call(this);

  this.organisms = [
    { 
      organism: "Organism_dummy2",
      component: (param) => new Organism_dummy2(param)
    },
    { 
      organism: "Organism_dummy2",
      component: (param) => new Organism_dummy2(param)
    },
  ]

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
            <div class="organism_dummy1_2">${slot(this.organisms[1].organism)}</div>
          </div>
        `;
      }

  this.bindScript= async function() {

    const state = await State
    const organisms = state.model.organisms
    const id = organisms.find(org => org.parentId === parentId).id

    for (let org of this.organisms) {
      await this.fillSlot(org.organism, org.component(id).getElement())
    }
  }
}
