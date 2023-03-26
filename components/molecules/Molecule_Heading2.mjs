import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Atom_Heading2 } from "../atoms/Atom_Heading2.mjs";

export function Molecule_Heading2() {
  Component.call(this);
  
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading2",
      component: new Atom_Heading2()
    }
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

this.getHtml = function() {
  return `
          ${slot(this.atoms[0].atom)}
`;
}

  this.bindScript = async function() {

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}

