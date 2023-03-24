import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Molecule_List } from "./Molecule_List.mjs";
import { Molecule_HeaderAndText } from "../molecules/Molecule_HeaderAndText.mjs"

export function Molecule_InputOutput(model) {
    Component.call(this)

    this.getHtml = function() {

        return `
            <div class="molecule_modal_in-output">
                ${slot("box1")}
                ${slot("icon1")}
                ${slot("box2")}
                ${slot("icon2")}
                ${slot("box3")}
            </div>
        `
    }

    this.bindScript= function() {
        let box1 = new Molecule_List(model.lists1)
        this.fillSlot("box1", box1.getElement());

        let icon1 = new Atom_Icon(model.atom_icon1)
        this.fillSlot("icon1", icon1.getElement());

        let box2 = new Molecule_HeaderAndText(model.molecule_headerAndText)
        this.fillSlot("box2", box2.getElement());

        let icon2 = new Atom_Icon(model.atom_icon2)
        this.fillSlot("icon2", icon2.getElement());

        let box3 = new Molecule_List(model.lists2)
        this.fillSlot("box3", box3.getElement());
    }

}