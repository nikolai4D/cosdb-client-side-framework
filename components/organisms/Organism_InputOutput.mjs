import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Molecule_List } from "../molecules/Molecule_List.mjs";
import { Molecule_HeaderAndText } from "../molecules/Molecule_HeaderAndText.mjs"

export function Organism_InputOutput() {
    Component.call(this)

    this.molecules = [
        {
            id: 1,
            molecule: "Molecule_List",
            component: new Molecule_List()
        }, 
        {
            id: 2,
            molecule: "Molecule_HeaderAndText",
            component: new Molecule_HeaderAndText()
        },
        {
            id: 3,
            molecule: "Molecule_List",
            component: new Molecule_List()
        }
    ]

    this.atoms = [
        {
            id: 1,
            molecule: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 2,
            molecule: "Atom_Icon",
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