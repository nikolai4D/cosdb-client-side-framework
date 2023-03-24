import { Component } from "../../core/Component.mjs";


export function Atom_Link(click = () => console.log("click")) {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return `<a>
                ${this.value[0].value}
            </a>
            `;
    }

    this.bindScript = function(){
        this.element.addEventListener("click", click)
    }
}
