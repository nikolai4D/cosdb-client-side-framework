import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Organism_dummy2 } from "./Organism_dummy2.mjs";
import { Molecule_dummy1 } from "../molecules/Molecule_dummy1.mjs";
import { Molecule_dummy2 } from "../molecules/Molecule_dummy2.mjs";

export function Organism_dummy1() {
  Component.call(this);

  this.organisms = [
    {
      id: 1,
      organism: "Organism_dummy2",
      component:  new Organism_dummy2()
    }
  ]

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_dummy1",
      component: new Molecule_dummy1()
    },
    {
      id: 2,
      molecule: "Molecule_dummy2",
      component: new Molecule_dummy2()
    },
  ];

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

    const [organism, molecule1, molecule2] = [
        ...this.organisms,
        ...this.molecules
      ];


    return `<div class="organism_dummy1">
            <div class="organism_dummy1_2">${slot(organism.organism)}</div>
            <div>${slot(molecule1.molecule)}</div>
            <div>${slot(molecule2.molecule)}</div>

          </div>
        `;
      }

  this.bindScript= async function() {

    for (let org of this.organisms) {
      await this.fillSlot(org.organism, org.component.getElement())
    }

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
  }
}
