import {slot} from "../../../core/helpers.mjs";
import {Component} from "../../../core/Component.mjs";
import { Organism_InputOutput } from "./Organism_InputOutput.mjs";

export function Organism_ModalProcess() {
    Component.call(this)

    this.organisms = [
        {
            id: 1,
            organism: "Organism_InputOutput",
            component: new Organism_InputOutput()
        }
    ];

    this.getHtml = function() {

        return `
        <div class="organism_process-modal">

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
        </div>
        `
    }

    this.bindScript= async function() {

        const {component, organism} = this.organisms[0]
        const organismElement = component.getElement()
        console.log(component, "component")
        await this.fillSlot(organism, organismElement)
        
        let thisElement = this.getElement()
    console.log(thisElement, "thisElement")

        window.addEventListener("DOMContentLoaded", (e)=>{
            
            console.log("hello!!!!!!!!!!!!!!!!!!")
        })


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