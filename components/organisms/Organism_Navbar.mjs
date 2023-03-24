import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_Logo } from "../molecules/Molecule_Logo.mjs";
import { Molecule_ListWIconLinks } from "../molecules/Molecule_ListWIconLinks.mjs";
import { Molecule_TextWButton } from "../molecules/Molecule_TextWButton.mjs";
import { router } from "../../index.mjs"


export function Organism_Navbar() {
  Component.call(this);

  this.molecules = [
    {
        id: 1,
        molecule: "Molecule_Logo",
        component: new Molecule_Logo()
    },
    {
        id: 2,
        molecule: "Molecule_ListWIconLinks",
        component: new Molecule_ListWIconLinks()
    },
    {
        id: 3,
        molecule: "Molecule_TextWButton",
        component: new Molecule_TextWButton()
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


    <div>
        <nav class="my-nav">

            <div class="organism_navbar-logo">
                ${slot(this.molecules[0].molecule)}
            </div>

            ${slot(this.molecules[1].molecule)}

            <div class="organism_user-navbar">
                ${slot(this.molecules[2].molecule)}
            </div>
        </nav>
        <div id="user-modal"></div>
    </div>


   
        `;
      }

  this.bindScript= async function() {


    for (let mol of this.molecules) {
      // console.log(mol)
      for (let atom of mol.component.atoms) {
       atom.component.click = async () => { await router.goTo(atom.component.value[0].value.toLowerCase())}
      }
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
  }
}
