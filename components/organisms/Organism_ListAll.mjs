import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";

export function Organism_ListAll() {
  Component.call(this);

  this.molecules = [
    {
        id: 1,
        molecule: "Molecule_HeadingSearchButton",
        component: new Molecule_HeadingSearchButton()
    },
    {
        id: 2,
        molecule: "Molecule_ListWHeading",
        component: new Molecule_ListWHeading()
    },
    {
        id: 3,
        molecule: "Molecule_ListWHeading",
        component: new Molecule_ListWHeading()
    },
    {
        id: 4,
        molecule: "Molecule_ListWHeading",
        component: new Molecule_ListWHeading()
    }
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

    return `

    <div class="organism_list-all-search">
        ${slot(this.molecules[0].molecule)}
        <div id="organism_all_lists" class="organism_list-all-search__lists">
            ${slot(this.molecules[1].molecule)}
            ${slot(this.molecules[2].molecule)}
            ${slot(this.molecules[3].molecule)}
        </div>
    </div>
        `;
      }

  this.bindScript= async function() {

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }

    for (let func of this.functions) {


      if (func.functionCall)
        await func.functionCall();
    }

  }
}
