import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";
import { Atom_ButtonNeutral } from "../atoms/Atom_ButtonNeutral.mjs";

export function Molecule_TextWButton() {
  Component.call(this);

  this.atoms = [
        {
            id: 1,
            atom: "Atom_Text1",
            component:  new Atom_Text1()
        },
        {
            id: 2,
            atom: "Atom_ButtonNeutral",
            component: new Atom_ButtonNeutral()
        },
    ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){


    return `
        <div>
            <div class="user-text">
                ${slot(this.atoms[0].atom)}
            </div>
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