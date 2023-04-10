
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
      component: new Atom_Input()
    },
    {
      id: 2,
      atom: "Atom_ButtonPositive",
      component: new Atom_ButtonPositive()
    },
  ]

this.getHtml = function() {
  return `
        <div>
            ${slot(this.atoms[0].atom)}
            ${slot(this.atoms[1].atom)}
        </div>

`;
}

this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
    {
      id: 2,
      function: "placeholder",
    },
  ];

  this.bindScript = async function() {
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}

