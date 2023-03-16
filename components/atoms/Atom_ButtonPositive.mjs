import { Component } from "../../core/Component.mjs";


export function Atom_ButtonPositive(onClick = () => console.log("click")) {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return ` <button class="atom_button-positive">${this.value[0].value}</button> `;
    }

    this.bindScript= function() {
        this.element.addEventListener("click", onClick)
    }
}
