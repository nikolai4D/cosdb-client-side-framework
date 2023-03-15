import { Component } from '../../core/Component.mjs'
import { slot } from "../../core/helpers.mjs";
import { Atom_dummy3 } from "../atoms/Atom_dummy3.mjs";
import { Atom_dummy4 } from "../atoms/Atom_dummy4.mjs";
import { State } from "../../State.mjs";

export function Molecule_dummy2() {
  Component.call(this);

  this.atoms = [
    {
      atom: "Atom_dummy3",
      component: new Atom_dummy3()
    },
    {
      atom: "Atom_dummy4",
      component: new Atom_dummy4()
    }
  ]

  this.functions = [
    {
      function: "function2",
    }
  ]

  this.getHtml = function(){
  return `
  <div>
    <div>${slot(this.atoms[0].atom)}</div>
    <div>${slot(this.atoms[1].atom)}</div>
  </div>
`;
}

  this.bindScript= async function() {

    // const state = await State
    // const molecules = state.model.molecules
    // const id = molecules.find(mol => mol.parentId === parentId).id

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }

  }
}
