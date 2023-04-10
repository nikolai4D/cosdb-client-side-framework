import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Molecule_SearchWButton } from "../molecules/Molecule_SearchWButton.mjs";
import { Organism_HeadingWLists } from "./Organism_HeadingWLists.mjs"

export function Organism_SearchWTopResults() {
    Component.call(this)

    this.molecules = [
        {
            id: 1,
            molecule: "Molecule_SearchWButton",
            component: new Molecule_SearchWButton()
        }
    ]

    this.organisms = [
        {
            id: 1,
            organism: "Organism_HeadingWLists",
            component: new Organism_HeadingWLists()
        }
    ]

    this.getHtml = function() {

        return `
            <div class="grid">
                <div class="organism_search_w_top_results">
                    <div class="organism_search_w_top_results__search">
                    ${slot(this.molecules[0].molecule)}
                    </div>
                    <div class="organism_search_w_top_results__lists">
                    ${slot(this.organisms[0].organism)}
                    </div>
                </div>
            </div>
        `
    }

    this.bindScript= async function() {
    const anArray = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh"]

    for (let mol of this.molecules) {
        for (let atom of mol.component.atoms) {
         atom.component.oninput = async (e) => {
            console.log(e.target.value)
            }
        }
        await this.fillSlot(mol.molecule, mol.component.getElement())
      }

      
        // for (let mol of this.molecules) {
        //     await this.fillSlot(mol.molecule, mol.component.getElement())
        //   }
        for (let org of this.organisms) {
        await this.fillSlot(org.organism, org.component.getElement())
        }
    }
}