import { Component } from "../../core/Component.mjs";


export function Atom_ListItem() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return `<li>
                ${this.value[0].value}
            </li>
            `;
    }

  this.bindScript = () => {
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

  }
}
