import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";

export function Molecule_SearchWButton() {
  Component.call(this);
  
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Input",
      component: Atom_Input()
    },
    {
      id: 2,
      atom: "Atom_ButtonPositive",
      component: Atom_ButtonPositive()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function() {
    return `
    <div class="">
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