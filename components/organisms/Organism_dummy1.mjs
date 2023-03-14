import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";

export function Organism_dummy1() {
  Component.call(this);

  this.organisms = [
    { 
      organism: "Organism_dummy2",
      component: new Organism_dummy2()
    },
    { 
      organism: "Organism_dummy2",
      component: new Organism_dummy2()
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

    for (let org of this.organisms) {
    // this.organisms.forEach(org => {
      await this.fillSlot(org.organism, org.component.getElement())
    }

  }

//   component.bindScript = async function() {
//     for await (let slot of this.organisms) {
//       if (await slot.component)
//       await component.fillSlot(slot.slot, slot.component.getElement())
//     // await component.slots.forEach( async slot => {

//   }
// }


}
