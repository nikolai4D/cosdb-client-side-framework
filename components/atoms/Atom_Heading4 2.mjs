import { Component } from "../../core/Component.mjs";


export function Atom_Heading4() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];


  this.getHtml = function(){

    return `  
      <h4 class="atom_heading4">${this.value[0].value}</h4>

    `;
    }


}
