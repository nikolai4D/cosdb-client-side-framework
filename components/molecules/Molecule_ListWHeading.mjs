import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_ListWHeading() {
  Component.call(this);

  this.data={}

  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading4",
      component:  new Atom_Heading4()
    },
    {
      id: 2,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 3,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 4,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 5,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 6,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },    
    {
      id: 7,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 8,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
    {
      id: 9,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },    
    {
      id: 10,
      atom: "Atom_ListItem",
      component: new Atom_ListItem()
    },
  ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){
    console.log(this.atoms.slice(1).map(at => at.atom).join(""))


    return `

        <div class="molecule_list">
            <div>
              ${slot(this.atoms[0].atom)}
            </div>
            <ul class="molecule_list__list">

            ${this.atoms.slice(1).map(at => at.atom).join("")}

            </ul>
        </div>
  `;
  }

  this.bindScript= async function() {



    // const groupByFirstLetter = (strings) => {
    //   const grouped = strings.reduce((acc, str) => {
    //     const firstLetter = str[0].toUpperCase();
    //     if (!acc[firstLetter]) {
    //       acc[firstLetter] = [];
    //     }
    //     acc[firstLetter].push(str);
    //     return acc;
    //   }, {});
    
    //   const sortedGrouped = Object.entries(grouped)
    //     .sort(([a], [b]) => a.localeCompare(b, "sv"))
    //     .map(([letter, title]) => ({ letter, title }));
    
    //   return sortedGrouped;
    // };
    




    // for (let func of this.functions) {
    //   if (func.functionCall){
    //     let data = await func.functionCall();

    //     let dataMap = data.map((item) => {
    //       return item.title.trim()
    //     })
    //     let dataObjMap = groupByFirstLetter(dataMap)

    //     console.log(dataObjMap, "dataObjMap")

    //     this.data= dataObjMap

    //     this.atoms = []
    //     let newComponent = new Atom_Heading4()
    //     newComponent.value = [{value: this.data[0].letter}]
        
    //     this.atoms.push({value: this.data[0].letter, id: 1, atom: "Atom_Heading4", component: newComponent })

    //     for (let [index, item] of this.data[0].title.entries()){

    //       let newComponent = new Atom_ListItem()
    //       newComponent.value = [{value: item}]

    //       this.atoms.push({value: item, id: index, atom: "Atom_ListItem", component: newComponent })
    //     }

    //     // for (let [index, atom] of this.atoms.entries()) {
    //     //   if (atom.atom === "Atom_Heading4"){
    //     //     atom.component.value = [{value: this.data[0].letter}]
    //     //   }
    //     //   else {
    //     //   atom.component.value = [{value: this.data[0].title[index-1]}]
    //     // }
        
    //     }
    //   }
      for (let atom of this.atoms) {
        await this.fillSlot(atom.atom, atom.component.getElement())
      }


  }


    
}