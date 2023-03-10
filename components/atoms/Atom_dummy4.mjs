import { Component }  from "../../core/Component.mjs";

export function Atom_dummy4() {

  Component.call(this);
  this.valueOptions = [
    {
      valueOption: "valueOption4",
    }
  ]

  this.getHtml = function(){
  return (
  `  <div>
      <h1>${this.valueOption}</h1>
    </div>
  `);
}
}
