import {Component} from "../../../core/Component.mjs";
import {slot} from "../../../core/helpers.mjs";
import { Molecule_ModalChildrenBoxes } from "../molecules/Molecule_ModalChildrenBoxes.mjs";
import { Molecule_ModalInputProcOutput } from "../molecules/Molecule_ModalInputProcOutput.mjs";
import { Molecule_ModalProParentBoxes } from "../molecules/Molecule_ModalProParentBoxes.mjs";


export function Organism_ModalProcessContent(model) {
    Component.call(this)

    this.getHtml = function() {

        return `
            <div class="organism_process-modal">
                ${slot("parentBoxes")}
                ${slot("inputProcOutput")}
                ${slot("childrenBoxes")}
            </div>
        ` 
    }

    this.bindScript= function() {
        let parentBoxes = new Molecule_ModalProParentBoxes(model.molecule_modalProcParentBoxes)
        this.fillSlot("parentBoxes", parentBoxes.getElement());

        let inputProcOutput = new Molecule_ModalInputProcOutput(model.molecule_modalInputProcOutput)
        this.fillSlot("inputProcOutput", inputProcOutput.getElement());

        let childrenBoxes = new Molecule_ModalChildrenBoxes(model.molecule_modalChildrenBoxes)
        this.fillSlot("childrenBoxes", childrenBoxes.getElement());
    }
}
