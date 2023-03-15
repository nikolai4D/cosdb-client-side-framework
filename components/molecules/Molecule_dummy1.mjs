import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_dummy1 } from "../atoms/Atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/Atom_dummy2.mjs";
import { State } from "../../State.mjs";

export function Molecule_dummy1() {
  Component.call(this);

  this.atoms = [
    {
      atom: "Atom_dummy1",
      component:  new Atom_dummy1()
    },
    {
      atom: "Atom_dummy2",
      component: new Atom_dummy2()
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
    <div class="molecule_dummy1">
      <div>${slot(this.atoms[0].atom)}</div>
      <div>${slot(this.atoms[1].atom)}</div>
    </div>
  `;
  }

  this.bindScript= async function() {
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}


    // const state = await State
    // const molecules = state.model.molecules
    // const moleculeId = molecules.find(mol => mol.parentId === parentId).id

    // for (let [index, atom] of this.atoms.entries()) {

    //   const atoms = state.model.atoms
    //   const atomValues = state.model.atomValues

    //   // })
    //   console.log(index, atom, "index atom")

    //   console.log(moleculeId, "moleculeId")


    //   let atomsWithSameValue = atoms.filter(at => at.value === atom.atom && at.parentId === moleculeId)
    //   console.log(atomsWithSameValue, "atoms with same value")

    //   let atomValuesWithAtomAsParent = atomsWithSameValue.filter(at => atomValues.find(atVal => atVal.parentId === at.id))
    //   console.log(atomValuesWithAtomAsParent, "atom values with atom as parent")
      
    //   let newComponent = atom.component(moleculeId)
    //   atom.component.value  =  [{ value: atomValuesWithAtomAsParent[index].value }]

    //   console.log(newComponent, "new component")

      // atomValues.filter(at => at.parentId === parentId)


      // atomValues.filter(atVal => {
      //   if (atVal.parentId === atom.atom) {


      // const currentAtomValue = atomValues.find(atVal => atVal.parentId === atomId)


      // await this.fillSlot(atom.atom, atom.component.getElement())

