import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs"; 
import { State } from "../../data-mgmt/state.mjs";

export function Organism_ListAll() {
  Component.call(this);

  this.molecules = [
    {
        id: 1,
        molecule: "Molecule_HeadingSearchButton",
        component: new Molecule_HeadingSearchButton()
    },
    {
        id: 2,
        molecule: "Molecule_ListWHeading",
        component: new Molecule_ListWHeading()
    }
  ];

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

    <div class="organism_list-all-search">
        ${slot(this.molecules[0].molecule)}
        <div id="organism_all_lists" class="organism_list-all-search__lists">
        ${this.molecules.slice(1).map(mol => slot(mol.molecule)).join("")}

        </div>
    </div>
        `;
      }

  this.bindScript= async function() {


    const type = "processes" 
    // const compData = await this.functions.function[1].functionCall()
    // const getData = State[compData]

        for (const func of this.functions) {
          if (func.functionCall){

            await func.functionCall(type);

            await State[type]

            const data = State[type]

            const indexOfComp =  this.molecules.findIndex((obj) => obj.component.constructorKey === newComponent.constructorKey);



            let newMolecules = []
            for (const [index, molecule] of  data.entries()){

              const newComponent = new Molecule_ListWHeading()

             
              newMolecules.push({id: index+1, molecule: newComponent.constructorKey, component: newComponent})

              const newAtom= new Atom_Heading4()
              const firstAtom = {value: molecule.letter, id: 1, atom: "Atom_Heading4", component: newAtom }
              newAtom.value = [firstAtom]
              newComponent.atoms = [firstAtom]


              for (const [index2, item] of molecule.title.entries()){
      
                const newComponentAtom = new Atom_ListItem()
                newComponentAtom.value = [{value: item}]
      
                newComponent.atoms.push(
                  {value: item, id: index2, atom: "Atom_ListItem", component: newComponentAtom }
                  )
              }
            }

            this.molecules.splice(indexOfComp, 1, ...newMolecules);
          }
        }

        this.element.lastElementChild.innerHTML = ""
        const moleculesSlots = this.element.lastElementChild
      
        for (const mol of this.molecules) {
          moleculesSlots.appendChild(mol.component.getElement())
        }
  }
}
