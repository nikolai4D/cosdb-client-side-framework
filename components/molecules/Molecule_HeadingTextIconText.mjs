import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";

export function Molecule_HeadingTextIconText() {
  Component.call(this);

  this.id = ""
  this.parentId = ""

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
    },
    {
      id: 3,
      atom: "Atom_Icon",
      component: new Atom_Icon()
    },
    {
      id: 4,
      atom: "Atom_Text1",
      component: new Atom_Text1()
    },
  ]

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


  this.getHtml = function(){

    return `

        <div class="molecule_headingIconText" data-id="${this.id}" data-parentId="${this.parentId}">
            <div class="molecule_headingIconText__header_icon">
              ${slot(this.atoms[0].atom)}
            </div>
            <div class="molecule_headingIconText__text">
              ${slot(this.atoms[1].atom)}
            </div>
            <div class="molecule_headingIconText__iconText">
              ${slot(this.atoms[2].atom)}
              ${slot(this.atoms[3].atom)}
            </div>
        </div>
  `;
  }

  this.bindScript= async function() {

      for (let atom of this.atoms) {
        await this.fillSlot(atom.atom, atom.component.getElement())
      }
  }
}