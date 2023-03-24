import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_TextWHeading } from "../molecules/Molecule_TextWHeading.mjs"

export function Organism_InputOutput() {
    Component.call(this)

    this.molecules = [
        {
            id: 1,
            molecule: "Molecule_ListWHeading",
            component: new Molecule_ListWHeading()
        }, 
        {
            id: 2,
            molecule: "Molecule_TextWHeading",
            component: new Molecule_TextWHeading()
        },
        {
            id: 3,
            molecule: "Molecule_ListWHeading",
            component: new Molecule_ListWHeading()
        }
    ]

    this.atoms = [
        {
            id: 1,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 2,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        }
    ]

    this.getHtml = function() {

        return `
            <div class="molecule_modal_in-output">
                ${slot(this.molecules[0].molecule)}
                ${slot(this.atoms[0].atom)}
                ${slot(this.molecules[1].molecule)}
                ${slot(this.atoms[1].atom)}
                ${slot(this.molecules[2].molecule)}
            </div>
        `
    }

    this.bindScript= async function() {
        for (let mol of this.molecules) {
            await this.fillSlot(mol.molecule, mol.component.getElement())
          }

          for (let at of this.atoms) {
            await this.fillSlot(at.atom, at.component.getElement())
          }

    }
}