import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";
import { Organism_dummy3 } from "./Organism_dummy3.mjs";

export function Organism_dummy1() {
  Component.call(this);

  this.organisms = [
    { 
      organism: "Organism_dummy2",
      component: new Organism_dummy2()
    },
    { 
      organism: "Organism_dummy3",
      component: new Organism_dummy3()
    }
  ]

  this.functions = [
    {
      function: "function3",
    },
    {
      function: "function4",
    }
  ]


  this.getHtml = function(){
    return `<div class="organism_dummy1">
            <div class="organism_dummy1_1">${slot(this.organisms[0].organism)}</div>
            <div class="organism_dummy1_2">${slot(this.organisms[1].organism)}</div>
          </div>
        `;
      }

  this.bindScript= function() {

    this.organisms.forEach(org => {
      this.fillSlot(org.organism, org.component.getElement())
    })
  }
}

// export function Organism_dummy1() {
//   Component.call(this);

//   this.organisms = [
//     {
//       organism: "Organism_dummy2"
//     },
//     {
//       organism: "Organism_dummy3"
//     }
//   ]

//   this.functions = [
//     {
//       function: "function3",
//     },
//     {
//       function: "function4",
//     }
//   ]


//   this.getHtml = function(){
//     return `<div>
//     <div>${this.organisms[0].organism}</div>
//     <div>${this.organisms[1].organism}</div>
//   </div>
//   `;
//   }
// }