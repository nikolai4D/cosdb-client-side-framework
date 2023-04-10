import { Component } from "../../core/Component.mjs";


export function Atom_Heading2() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];


  this.getHtml = function(){

    return `  
      <h2 class="atom_heading2">${this.value[0].value}</h2>
    `;
    }

}
