import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Molecule_SearchWButton } from "../molecules/Molecule_SearchWButton.mjs";
import { Molecule_HeadingWListsWFooter } from "../molecules/Molecule_HeadingWListsWFooter.mjs"

export function Organism_InputOutput() {
    Component.call(this)

    this.molecules = [
        {
            id: 1,
            molecule: "Molecule_SearchWButton",
            component: new Molecule_SearchWButton()
        }, 
        {
            id: 2,
            molecule: "Molecule_HeadingWListsWFooter",
            component: new Molecule_HeadingWListsWFooter()
        },
    ]

    this.getHtml = function() {

        return `
            <div class="grid">
                <div class="grid-placement__c2-2r3">
                    ${slot(this.molecules[0].molecule)}
                    ${slot(this.molecules[1].molecule)}
                </div>
            </div>
        `
    }

    this.bindScript= async function() {
        for (let mol of this.molecules) {
            await this.fillSlot(mol.molecule, mol.component.getElement())
          }
    }
}