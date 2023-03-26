import { Component } from "../../core/Component.mjs";


export function Atom_Link() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.click = () => console.log("click")

  this.getHtml = function(){
    return `<a>
                ${this.value[0].value}
            </a>
            `;
    }

    this.bindScript = function(){
        this.element.addEventListener("click", this.click)
    }
}
