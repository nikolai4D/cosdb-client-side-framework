import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Molecule_ChildrenBoxes } from "../molecules/Molecule_ChildrenBoxes.mjs";
import { Organism_InputOutput } from "./Organism_InputOutput.mjs";
import { Molecule_ParentBoxes } from "../molecules/Molecule_ParentBoxes.mjs";


export function Organism_ModalContent() {
    Component.call(this)

    this.organisms = [
        {
            id: 1,
            organism: "Organism_InputOutput",
            component: new Organism_InputOutput()
        }, 
    ]

    // this.molecules = [
    //     {
    //         id: 1,
    //         molecule: "Molecule_ChildrenBoxes",
    //         component: new Molecule_ChildrenBoxes()
    //     }, 
    //     {
    //         id: 2,
    //         molecule: "Molecule_ParentBoxes",
    //         component: new Molecule_ParentBoxes()
    //     }
    // ]

    this.getHtml = function() {

        // return `
        //     <div class="organism_process-modal">
        //         ${slot(this.molecules[0].molecule)}
        //         ${slot(this.organisms[0].organism)}
        //         ${slot(this.molecules[1].molecule)}

        //     </div>
        // `

        return `
        <div class="organism_process-modal">
            ${slot(this.organisms[0].organism)}

        </div>
    `
    }

    this.bindScript= async function() {
        // for (let mol of this.molecules) {
        //     await this.fillSlot(mol.molecule, mol.component.getElement())
        //   }

          for (let org of this.organisms) {
            await this.fillSlot(org.organism, org.component.getElement())
          }
    }

}