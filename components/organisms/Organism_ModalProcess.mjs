import {slot} from "../../../core/helpers.mjs";
import {Component} from "../../../core/Component.mjs";
// import { Organism_ModalProcessContent } from "./Organism_ModalProcessContent.mjs";
import { Molecule_TextWButton } from "../molecules/Molecule_TextWButton.mjs";

export function Organism_ModalProcess() {
    Component.call(this)

    // this.organisms = [
    //     {
    //         id: 1,
    //         organism: "Organism_ModalProcessContent",
    //         component: new Organism_ModalProcessContent()
    //     }
    // ];

    this.molecules = [
        {
            id:1,
            molecule:"Molecule_TextWButton",
            component: new Molecule_TextWButton()
        }
    ]
    
    this.modal = null;

    this.getHtml = function() {
        // ${slot(this.organisms[0].organism)}

        return `
        <div id="modal-background" class="modal">
            <div class="modal-container modal-process-inner-wrap">
                <div class="modal-process-section">
                    <div class="modal-process-upper-section">
                        <i class="bi bi-x"></i>
                    </div>
                </div> 
                ${slot(this.molecules[0].molecule)}
            </div>
        </div>
        `
    }

    this.bindScript= async function() {

        const {molecules} = this
        // await this.fillSlot(organisms[0].organism, organisms[0].component.getElement())
        await this.fillSlot(molecules[0].molecule, molecules[0].component.getElement())

        const mStyle = this.getElement().style
        mStyle.position = "absolute"
        mStyle.width = window.innerWidth + "px"
        mStyle.height = window.innerHeight + "px"
        mStyle.top = "0px"
        mStyle.left = "0px"
        mStyle.backgroundColor = "rgba(0,0,0,0.5)"
        mStyle.display = "flex"
        mStyle.justifyContent = "center"
        mStyle.alignItems = "center"

        // this.content.getElement().style.backgroundColor = "white"

        this.getElement().addEventListener("click", (e)=>{
            if(e.target === this.getElement()){
                this.getElement().remove()
            }
        })

        this.getElement().querySelector(".bi-x").addEventListener("click", (e) => {
            document.querySelector('#modal-background').remove()
        });
    }

    this.show= function() {
        document.body.append(this.getElement())
    }
}