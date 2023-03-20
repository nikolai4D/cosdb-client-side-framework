import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs"; 

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
    },
    {
        id: 3,
        molecule: "Molecule_ListWHeading",
        component: new Molecule_ListWHeading()
    },
    {
        id: 4,
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
            ${slot(this.molecules[1].molecule)}
            ${slot(this.molecules[2].molecule)}
            ${slot(this.molecules[3].molecule)}
        </div>
    </div>
        `;
      }

  this.bindScript= async function() {

    const groupByFirstLetter = (strings) => {
      const grouped = strings.reduce((acc, str) => {
        const firstLetter = str[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(str);
        return acc;
      }, {});
    
      const sortedGrouped = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b, "sv"))
        .map(([letter, title]) => ({ letter, title }));
    
      return sortedGrouped;
    };

    const compData = await this.functions.function[1].functionCall()
    const getData = State[compData]

        for (let func of this.functions) {
          if (func.functionCall){
            let data = await func.functionCall();
    
          //   let dataMap = data.map((item) => {
          //     return item.title.trim()
          //   })


          //   let dataObjMap = groupByFirstLetter(dataMap)
    
          //   this.data= dataObjMap

          //   console.log(dataObjMap, "data")
    

          //   this.molecules = []


          //   for (let [index, molecule] of this.data.entries()){

          //     let newComponent = new Molecule_ListWHeading()

          //     this.molecules.push({id: index+1, molecule: newComponent.constructorKey, component: newComponent})
              
          //     let newAtom= new Atom_Heading4()
          //     let firstAtom = {value: molecule.letter, id: 1, atom: "Atom_Heading4", component: newAtom }
          //     newAtom.value = [firstAtom]
          //     newComponent.atoms = [firstAtom]



          //     for (let [index2, item] of molecule.title.entries()){
      
          //       let newComponentAtom = new Atom_ListItem()
          //       newComponentAtom.value = [{value: item}]
      
          //       newComponent.atoms.push({value: item, id: index2, atom: "Atom_ListItem", component: newComponentAtom })
          //     }
          //   }
          }
    }

          for (let mol of this.molecules) {
            console.log(mol, "mol")
            await this.fillSlot(mol.molecule, mol.component.getElement())
          }
  }
}
