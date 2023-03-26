import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";

export function Molecule_ChildrenBoxes() {
    Component.call(this)

    this.atoms = [
        {
            id: 1,
            atom: "Atom_Icon",
            component:  new Atom_Icon()
        },
        {
            id: 2,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        },
        {
            id: 3,
            atom: "Atom_Icon",
            component:  new Atom_Icon()
        },
        {
            id: 4,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        },
        {
            id: 5,
            atom: "Atom_Icon",
            component:  new Atom_Icon()
        },
        {
            id: 6,
            atom: "Atom_Heading4",
            component: new Atom_Heading4()
        }

      ]


    this.getHtml = function() {

        return `
            <div class="molecule_modal-proc-third-section">
                ${slot(this.atoms[0].atom)}
                <div class="molecule_modal-proc-children"> 
                    ${this.atoms.slice(1).map((at) => slot(at.atom)).join("")}
                </div>
            </div>
        `
    }

    this.bindScript= async function() {
        for (let at of this.atoms) {
            await this.fillSlot(at.atom, at.component.getElement())
          }
    }

}