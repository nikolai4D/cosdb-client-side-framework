import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_List() {
  Component.call(this);

  this.atoms = [
    {
      id: 1,
      atom: "Atom_ListItem",
      component:  new Atom_ListItem()
    }
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
            <ul class="molecule_list__list">
            ${this.atoms.map(at => slot(at.atom)).join("")}
            </ul>
  `;
  }

  this.bindScript= async function() {


      for (let atom of this.atoms) {




        await this.fillSlot(atom.atom, atom.component.getElement())
      }


  }

}