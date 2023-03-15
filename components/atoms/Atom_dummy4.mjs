import { Component } from "../../core/Component.mjs";
import { State } from "../../State.mjs";

export function Atom_dummy4() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){

  return `<div>
          <h1>${this.value[0].value}</h1>
        </div>
      `;
  }

  this.bindScript = async function() {


  }
}
