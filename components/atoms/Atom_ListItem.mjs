import { Component } from "../../core/Component.mjs";


export function Atom_ListItem() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.click = () => console.log("click")

  this.getHtml = function(){
    return `<li>
                ${this.value[0].value}
            </li>
            `;
  }

    this.bindScript = function(){
      this.element.addEventListener("click", this.click)
  }
}
