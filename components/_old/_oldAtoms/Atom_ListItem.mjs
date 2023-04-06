import { Component } from "../../core/Component.mjs";


export function Atom_ListItem() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return `<li>
                ${this.value[0].value}
            </li>
            `;
    }
}
