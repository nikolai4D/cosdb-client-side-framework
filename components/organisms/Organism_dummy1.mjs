import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";
import { State } from "../../State.mjs";
// import { State } from "../../data-mgmt/State.mjs";


export function Organism_dummy1(parentId) {
  Component.call(this);

  this.id = async function() {
    (await State).organisms.find(org => org.parentId === parentId).id
  }

  this.organisms = [
    { 
      organism: "Organism_dummy2",
      component: new Organism_dummy2(this.id())
    },
    { 
      organism: "Organism_dummy2",
      component: new Organism_dummy2(this.id())
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

    console.log({State})
    console.log({parentId})
    console.log(this.id, "id")


    for (let org of this.organisms) {
      await this.fillSlot(org.organism, org.component.getElement())
    }
  }
}
