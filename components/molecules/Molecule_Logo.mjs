import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";

export function Molecule_Logo() {
  Component.call(this);

  this.atoms = [
        {
            id: 1,
            atom: "Atom_Icon",
            component:  new Atom_Icon()
        },
        {
            id: 2,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        },
    ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){


    return `
        <div class="molecule_logo">
            ${slot(this.atoms[0].atom)}
            ${slot(this.atoms[1].atom)}
        </div>

  `;
  }

  this.bindScript= async function() {
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}