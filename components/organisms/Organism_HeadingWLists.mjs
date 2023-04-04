import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Molecule_Heading2 } from "../molecules/Molecule_Heading2.mjs";
import { Molecule_List } from "../molecules/Molecule_List.mjs";


export function Organism_HeadingWLists() {
  Component.call(this);
  


  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_Heading2",
      component: new Molecule_Heading2()
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
    {
      id: 4,
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

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }

  }
}

