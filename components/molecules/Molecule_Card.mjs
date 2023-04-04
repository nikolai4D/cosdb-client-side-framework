import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Image } from "../atoms/Atom_Image.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";

export function Molecule_Card() {
  Component.call(this);

  this.atoms = [
    {
      id: 1,
      atom: "Atom_Image",
      component:  new Atom_Image()
    },
    {
        id: 1,
        atom: "Atom_Text1",
        component:  new Atom_Text1()
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
     <div id="mol-img-text" class="molecule_image-and-text">
        ${slot(this.atoms[0].atom)}
        <div class="molecule_card-text">
        ${slot(this.atoms[1].atom)}
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