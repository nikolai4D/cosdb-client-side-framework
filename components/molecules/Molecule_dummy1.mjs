import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_dummy1 } from "../atoms/Atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/Atom_dummy2.mjs";
import { State } from "../../State.mjs";

export function Molecule_dummy1() {
  Component.call(this);

  this.atoms = [
    {
      id: 1,
      atom: "Atom_dummy1",
      component:  new Atom_dummy1()
    },
    {
      id: 2,
      atom: "Atom_dummy2",
      component: new Atom_dummy2()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){
    return `
    <div class="molecule_dummy1">
      <div>${slot(this.atoms[0].atom)}</div>
      <div>${slot(this.atoms[1].atom)}</div>
    </div>
  `;
  }

  this.bindScript= async function() {
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}