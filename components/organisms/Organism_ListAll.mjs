import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";

export function Organism_ListAll() {
  Component.call(this);

  this.molecules = [
    {
        id: 1,
        molecule: "Molecule_List",
        component: new Molecule_ListWHeading()
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

    const [molecule1, molecule2, molecule3] = [
        ...this.molecules
      ];


    return `

    <div class="organism_list-all-search">
        <div class="organism_list-all-search__top">
            ${""}
            <div class="organism_list_search_btn">
                ${""}
                ${""}
            </div>
        </div>
        <div id="organism_all_lists" class="organism_list-all-search__lists">
            ${slot(molecule1)}
            ${slot(molecule2)}
            ${slot(molecule3)}
        </div>
    </div>
        `;
      }

  this.bindScript= async function() {

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
  }
}
