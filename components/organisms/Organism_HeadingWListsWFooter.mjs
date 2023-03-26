import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Molecule_Heading2 } from "../molecules/Molecule_Heading2.mjs";
import { Molecule_ListWFooter } from "../molecules/Molecule_ListWFooter.mjs";


export function Organism_HeadingWListsWFooter() {
  Component.call(this);
  


  this.molecules = [
    {
      id: 1,
      atom: "Molecule_Heading2",
      component: new Molecule_Heading2()
    },
    {
        id: 2,
        molecule: "Molecule_ListWFooter",
        component: new Molecule_ListWFooter()
    },
    {
        id: 3,
        molecule: "Molecule_ListWFooter",
        component: new Molecule_ListWFooter()
    },
    {
      id: 4,
      molecule: "Molecule_ListWFooter",
      component: new Molecule_ListWFooter()
    },
  ]



  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

this.getHtml = function() {
  return `
        <div class="organism_heading_lists_w_footer">
        ${slot(this.molecules[0].molecule)}
            <div class="organism_heading_lists_w_footer__lists">
                <div>
                    ${slot(this.molecules[1].molecule)}
                </div>
                <div>
                    ${slot(this.molecules[2].molecule)}
                </div>
                <div>
                    ${slot(this.molecules[3].molecule)}
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

