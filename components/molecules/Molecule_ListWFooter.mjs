import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_ListWFooter() {
  Component.call(this);

  this.data={}

  this.atoms = [
    {
      id: 1,
      atom: "Atom_Text1",
      component:  new Atom_Text1()
    },
    {
      id: 2,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){

    return `

        <div class="molecule_list">
            <ul class="molecule_list__list">
                ${this.atoms.slice(1).map(at => slot(at.atom)).join("")}
            </ul>
            <div class="molecule_list__footer">
                ${slot(this.atoms[0].atom)}
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