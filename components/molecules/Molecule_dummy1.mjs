import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_dummy1 } from "../atoms/Atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/Atom_dummy2.mjs";
import { State } from "../../State.mjs";

export function Molecule_dummy1(parentId) {
  Component.call(this);

  this.atoms = [
    {
      atom: "Atom_dummy1",
      component: (param) => new Atom_dummy1(param)
    },
    {
      atom: "Atom_dummy2",
      component: (param) => new Atom_dummy2(param)
    }
  ]

  this.functions = [
    {
      function: "function1",
    },
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

    const state = await State
    const molecules = state.model.molecules
    const id = molecules.find(mol => mol.parentId === parentId).id

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component(id).getElement())
    }

  }
}
