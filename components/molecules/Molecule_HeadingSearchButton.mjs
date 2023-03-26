import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Atom_Input } from "../atoms/Atom_Input.mjs";
import { Atom_ButtonPositive } from "../atoms/Atom_ButtonPositive.mjs";
import { Atom_Heading2 } from "../atoms/Atom_Heading2.mjs";


export function Molecule_HeadingSearchButton() {
  Component.call(this);
  
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading2",
      component: new Atom_Heading2()
    },
    {
      id: 2,
      atom: "Atom_Input",
      component: new Atom_Input()
    },
    {
      id: 3,
      atom: "Atom_ButtonPositive",
      component: new Atom_ButtonPositive()
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

this.getHtml = function() {
  return `
        <div class="organism_list-all-search__top">

          ${slot(this.atoms[0].atom)}
          <div class="organism_list_search_btn">
            ${slot(this.atoms[1].atom)}
            ${slot(this.atoms[2].atom)}
          </div>
        </div>

`;
}

  this.bindScript = async function() {

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}

