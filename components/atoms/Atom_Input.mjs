import { Component } from "../../core/Component.mjs";


export function Atom_Input() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.change = (e) => console.log(e.target.value)
  
  this.getHtml = function(){
    return `<input class="atom_input" type="text" placeholder="${this.value[0].value}">`;
    }

  this.bindScript= function() {
      this.element.addEventListener("change", this.change)
  }
}
