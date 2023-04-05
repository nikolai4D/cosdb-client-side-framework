import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";

export function Molecule_TextWHeading() {
  Component.call(this);


  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading4",
      component:  new Atom_Heading4()
    },
    {
      id: 2,
      atom: "Atom_Text1",
      component: new Atom_Text1()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){

    return `

        <div class="molecule_header-and-text">
            ${this.atoms.map(at => slot(at.atom)).join("")}
        </div>
    `;
  }

  this.bindScript= async function() {

      for (let atom of this.atoms) {
        await this.fillSlot(atom.atom, atom.component.getElement())
      }

  }

}