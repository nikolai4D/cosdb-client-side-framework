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
        <div id="modal-background" class="modal">
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
        console.log(this.getElement())
        const mStyle = this.getElement().style
        mStyle.position = "absolute"
        mStyle.width = "100vw"
        mStyle.height = "100vh"
        mStyle.top = "0px"
        mStyle.left = "0px"
        mStyle.backgroundColor = "rgba(0,0,0,0.5)"
        mStyle.display = "flex"
        mStyle.justifyContent = "center"
        mStyle.alignItems = "center"

        organismElement.style.backgroundColor = "white"

        this.getElement().addEventListener("click", (e)=>{
            if(e.target === this.getElement()){
                console.log(e.target)
                this.getElement().remove()
            }
        })

        this.getElement().querySelector(".bi-x").addEventListener("click", (e) => {
            document.querySelector('#modal-background').remove()
        });
    }
}