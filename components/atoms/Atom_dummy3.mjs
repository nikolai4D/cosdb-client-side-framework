import { Component } from "../../core/Component.mjs";

export function Atom_dummy3() {
  Component.call(this);

  this.valueOption = "valueOption3"


  this.getHtml = function(){
  return (
  `  <div>
      <h1>${this.valueOption}</h1>
    </div>
  `);
}

}

