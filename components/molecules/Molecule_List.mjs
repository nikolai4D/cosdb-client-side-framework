import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_List() {
  Component.call(this);

  this.atoms = [
    {
      id: 1,
      atom: "Atom_ListItem",
      component:  new Atom_ListItem()
    }
  ]

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
    {
      id: 2,
      function: "placeholder",
    },
  ];

  this.getHtml = function(){

    return `
            <ul class="molecule_list__list">
            ${this.atoms.map(at => slot(at.atom)).join("")}
            </ul>
  `;
  }

  this.bindScript= async function() {


      for (let atom of this.atoms) {

        let component = atom.component.getElement()
        let elementsArray =[];
    
        // if (elementsArray.length === 0) elementsArray = [document.getElementById("organism_all_lists")]
          //  for(let child of elementsArray){
          //   for (let element of child.children[1].children)
          //   {
            component.addEventListener("click", (e) => {
                    const modalId = document.getElementById('modal-processView')
                  console.log("hello")
                    modalId.innerHTML = `
                        <div>
                            ${slot("new-modal")}
                        </div>
                        `
                    this.fillSlot("new-modal", component);
                })
            // }
          // }



        await this.fillSlot(atom.atom, atom.component.getElement())
      }


  }

}