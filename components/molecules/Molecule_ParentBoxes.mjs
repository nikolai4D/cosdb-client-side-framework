import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";

export function Molecule_ParentBoxes(model) {
    Component.call(this)

    this.getHtml = function() {

        return `
            <div class="molecule-modal-proc-first-section">
                <div class="molecule_proc-parentboxes">
                    ${slot("box1")}
                    ${slot("icon1")}
                    ${slot("box2")}
                    ${slot("icon2")}
                    ${slot("box3")}
                </div>
                ${slot("icon3")}
            </div>
        `
    }

    this.bindScript= function() {
        let box1 = new Atom_Heading4(model.atom_heading4a)
        this.fillSlot("box1", box1.getElement());

        let icon1 = new Atom_Icon(model.atom_icon1)
        this.fillSlot("icon1", icon1.getElement());

        let box2 = new Atom_Heading4(model.atom_heading4b)
        this.fillSlot("box2", box2.getElement());

        let icon2 = new Atom_Icon(model.atom_icon2)
        this.fillSlot("icon2", icon2.getElement());

        let box3 = new Atom_Heading4(model.atom_heading4c)
        this.fillSlot("box3", box3.getElement());

        let icon3 = new Atom_Icon(model.atom_icon3)
        this.fillSlot("icon3", icon3.getElement());
    }

}