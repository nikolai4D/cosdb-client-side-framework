import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Atom_dummy3 } from "../atoms/Atom_dummy3.mjs";
import { Atom_dummy4 } from "../atoms/Atom_dummy4.mjs";

export function Molecule_dummy4() {
  Component.call(this);
  
  this.atoms = [
    {
      id: 1,
      atom: "Atom_dummy3",
      component: Atom_dummy3()
    },
    {
      id: 2,
      atom: "Atom_dummy4",
      component: Atom_dummy4()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function() {
    return `
    <div class="molecule_dummy4">
      <div>${slot(this.atoms[0].atom)}</div>
      <div>${slot(this.atoms[1].atom)}</div>
    </div>
  `;
  }

  this.bindScript = async function() {

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}