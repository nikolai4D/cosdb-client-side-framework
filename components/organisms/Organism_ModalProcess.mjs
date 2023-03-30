import {slot} from "../../../core/helpers.mjs";
import {Component} from "../../../core/Component.mjs";
import { Organism_ModalProcessContent } from "./Organism_ModalProcessContent.mjs";

export function Organism_ModalProcess() {
    Component.call(this)

    this.organisms = [
        {
            id: 1,
            organism: "Organism_ModalProcessContent",
            component: new Organism_ModalProcessContent()
        }
    ];

    this.modal = null;

    this.getHtml = function() {

        return `
        <div id="modal-background" class="modal organism_modalBackground">
            <div class="modal-container modal-process-inner-wrap">
                <div class="modal-process-section">
                    <div class="modal-process-upper-section">
                        <i class="bi bi-x"></i>
                    </div>
                </div> 
                ${slot(this.organisms[0].organism)}
                </div>
        </div>
        `
    }

    this.bindScript= async function() {

        const {organisms} = this
        let organismElement = organisms[0].component.getElement()
        await this.fillSlot(organisms[0].organism, organismElement)
        let thisElement = this.getElement()
        console.log(thisElement)

        thisElement.addEventListener("click", (e)=>{
            if(e.target === thisElement){
                console.log(e.target)
                thisElement.remove()

            }
        })

        thisElement.querySelector(".bi-x").addEventListener("click", (e) => {
            document.querySelector('#modal-background').remove()
        });
    }
}