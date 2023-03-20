import { Component } from "../../core/Component.mjs";


export function Atom_Icon() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return `<i class="${this.value[0].value} atom_icon">
            </i>
            `;
    }
}
