import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_dummy1 } from "../atoms/Atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/Atom_dummy2.mjs";

export function Molecule_dummy1() {
  Component.call(this);

  this.atoms = [
    {
      atom: "Atom_dummy1",
      component: new Atom_dummy1()
    },
    {
      atom: "Atom_dummy2",
      component: new Atom_dummy2()
    }
  ]

  this.functions = [
    {
      function: "function1",
    },
    {
      function: "function2",
    }
  ]

this.getHtml = function(){
  return `
  <div>
    <div>${this.atoms[0].atom}</div>
    <div>${this.atoms[1].atom}</div>
  </div>
`;
}

this.bindScript= function() {
  this.atoms.forEach(atom => {
    this.fillSlot(atom.atom, atom.component.getElement())
  })
}


}
