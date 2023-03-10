
import Component from "../../core/Component.mjs";

export function Atom_dummy2() {
  Component.call(this);

  this.valueOptions = [
    {
      valueOption: "valueOption2",
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
