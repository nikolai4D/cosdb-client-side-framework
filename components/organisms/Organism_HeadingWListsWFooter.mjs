import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Atom_Heading2 } from "../atoms/Atom_Heading2.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";
import { Molecule_List } from "../molecules/Molecule_List.mjs";


export function Organism_HeadingWListsWFooter() {
  Component.call(this);
  
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading2",
      component: new Atom_Heading2()
    },
    {
      id: 2,
      atom: "Atom_Text1",
      component: new Atom_Text1()
    },
    {
      id: 3,
      atom: "Atom_Text1",
      component: new Atom_Text1()
    },
    {
        id: 4,
        atom: "Atom_Text1",
        component: new Atom_Text1()
    }
  ]


  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_List",
      component: new Molecule_List()
    },
    {
        id: 2,
        molecule: "Molecule_List",
        component: new Molecule_List()
    },
    {
        id: 3,
        molecule: "Molecule_List",
        component: new Molecule_List()
    },
  ]



  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

this.getHtml = function() {
  return `
        <div>
          ${slot(this.atoms[0].atom)}
            <div>
                <div>
                    ${slot(this.molecules[0].molecule)}
                    ${slot(this.atoms[1].atom)}
                </div>
                <div>
                    ${slot(this.molecules[1].molecule)}
                    ${slot(this.atoms[2].atom)}
                </div>
                <div>
                    ${slot(this.molecules[2].molecule)}
                    ${slot(this.atoms[3].atom)}
                </div>
            </div>
        </div>

`;
}

  this.bindScript = async function() {

    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
    
  }
}

