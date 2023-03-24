import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";

export function Molecule_ParentBoxes() {
    Component.call(this)

    this.atoms = [
        {
            id: 1,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        },
        {
            id: 2,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 3,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        },
        {
            id: 4,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 5,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        }
    ]


    this.getHtml = function() {

        return `
            <div class="molecule-modal-proc-first-section">
                <div class="molecule_proc-parentboxes">
                ${this.atoms.map((at) => slot(at.atom)).slice(0,-1).join("")}
                </div>
                ${slot(this.atoms.slice(0,-1)[0].atom)}
            </div>
        `
    }

    this.bindScript= async function() {
        for (let at of this.atoms) {
            await this.fillSlot(at.atom, at.component.getElement())
          }
    }

}