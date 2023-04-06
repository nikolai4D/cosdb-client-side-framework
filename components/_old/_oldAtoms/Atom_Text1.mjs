import { Component } from "../../core/Component.mjs";


export function Atom_Text1() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];


  this.getHtml = function(){

    return `  
        <p id="user-text" "class="atom_text1">${this.value[0].value}</p>
    `;
    }

}
