import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy4 } from "./Organism_dummy4.mjs";


export function Organism_dummy2() {
  Component.call(this);

  this.organisms = [
    {
      organism: "Organism_dummy4",
      component: new Organism_dummy4()

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

    return `
    <div>
      <div>${this.organisms[0].organism}</div>
    </div>
  `;
  }
}