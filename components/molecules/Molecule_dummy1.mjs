import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_dummy1 } from "../atoms/Atom_dummy1.mjs";
import { Atom_dummy2 } from "../atoms/Atom_dummy2.mjs";
import { State } from "../../State.mjs";

export function Molecule_dummy1(parentId) {
  Component.call(this);

  this.atoms = [
    {
      atom: "Atom_dummy2",
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
    const moleculeId = molecules.find(mol => mol.parentId === parentId).id
    // this.value[0].value = currentAtomValue.value;


    for (let [index, atom] of this.atoms.entries()) {

      const atoms = state.model.atoms
      const atomValues = state.model.atomValues
      // let currentAtomValue = ""

      const atomsWithParentId = atoms.filter(at => at.parentId === moleculeId)
      console.log(atomsWithParentId, "atoms with parent id")

      // atomsWithParentId.filter(at => {
      //   const atomValue = atomValues.filter(atVal => atVal.value === atom.atom)
      //   at.value = atomValue.value
      // })

      let atomsWithSameValue = atoms.filter(at =>at.value === atom.atom && at.parentId === moleculeId)
      console.log(atomsWithSameValue, "atoms with same value")

      let atomValuesWithAtomAsParent = atomsWithSameValue.filter(at => atomValues.find(atVal => atVal.parentId === at.id))
      console.log(atomValuesWithAtomAsParent, "atom values with atom as parent")
      
      let newComponent = atom.component(moleculeId)
      atom.component.value  =  [{ value: atomValuesWithAtomAsParent[index].value }]

      console.log(newComponent, "new component")

      // atomValues.filter(at => at.parentId === parentId)


      // atomValues.filter(atVal => {
      //   if (atVal.parentId === atom.atom) {


      // const currentAtomValue = atomValues.find(atVal => atVal.parentId === atomId)


      await this.fillSlot(atom.atom, atom.component(id).getElement())
    }

  }
}
