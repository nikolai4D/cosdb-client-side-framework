import { Component } from "../../core/Component.mjs";
import { State } from "../../State.mjs";

export function Atom_dummy3(parentId) {
  Component.call(this);

  this.value = [{ value: "value3" }];

  this.getHtml = function(){
    return `<div>
    <h1>${this.value[0].value}</h1>
  </div>
`;
}

  this.bindScript = async function() {
 
  }

}

