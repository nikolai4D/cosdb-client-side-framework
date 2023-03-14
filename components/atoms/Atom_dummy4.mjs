import { Component } from "../../core/Component.mjs";
import { State } from "../../State.mjs";

export function Atom_dummy4(parentId) {
  Component.call(this);

  this.value = [{ value: "value4" }];

  this.getHtml = function(){

  return `<div>
          <h1>${this.value[0].value}</h1>
        </div>
      `;
  }

  this.bindScripts = async function() {
    const state = await State
    const atoms = state.model.atoms
    const id = atoms.find(at => at.parentId === parentId).id

  }
}
