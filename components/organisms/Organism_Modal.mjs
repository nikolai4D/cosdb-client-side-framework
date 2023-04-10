import {slot} from "../../../core/helpers.mjs";
import {Component} from "../../../core/Component.mjs";
import { Organism_ModalContent } from "./Organism_ModalContent.mjs";

export function Organism_Modal() {
    Component.call(this)

    this.organisms = [
        {
            id: 1,
            organism: "Organism_ModalContent",
            component: new Organism_ModalContent()
        }
    ];

    this.getHtml = function() {

        return `
        <div id="modal-background" class="modal organism_modal_background">
            <div class="modal-container modal-inner-wrap">
                <div class="modal-section">
                    <div class="modal-upper-section">
                        <i class="bi bi-x"></i>
                    </div>
                </div> 
                ${slot(this.organisms[0].organism)}
                </div>
        </div>
        `
    }

    this.bindScript= async function() {

        const {component, organism} = this.organisms[0]
        const organismElement = component.getElement()
        await this.fillSlot(organism, organismElement)
        
        let thisElement = this.getElement()

        thisElement.addEventListener("click", (e)=>{
            if(e.target === thisElement){
                thisElement.remove()
            }
        })

        thisElement.querySelector(".bi-x").addEventListener("click", (e) => {
            document.querySelector('#modal-background').remove()
        });
    }
}