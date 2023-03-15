import { Component } from '../../core/Component.mjs'
import { slot } from "../../core/helpers.mjs";
import { Atom_dummy4 } from "../atoms/Atom_dummy4.mjs";

export function Molecule_dummy2() {
  Component.call(this);

  this.atoms = [
    { id: 1, 
      atom: "Atom_dummy4",
      component: new Atom_dummy4()
    }
  ]

  this.functions = [
    {
      id: 1,
      function: "function2",
    }
  ]

  this.getHtml = function(){
  return `
  <div class="molecule_dummy2">
    <div>${slot(this.atoms[0].atom)}</div>
  </div>
`;
}

  this.bindScript= async function() {

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }

  }
}
