import { Component } from "../../core/Component.mjs";


export function Atom_ButtonNeutral( ) {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.click = () => console.log("click")
  
  this.getHtml = function(){
    return ` <button class="atom_button-neutral">${this.value[0].value}</button> `;
    }

    this.bindScript= function() {
        this.element.addEventListener("click", this.click)
    }
}
