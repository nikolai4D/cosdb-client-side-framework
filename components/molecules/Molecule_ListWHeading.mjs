import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";

export function Molecule_ListWHeading() {
  Component.call(this);

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


    return `

        <div class="molecule_list">
            <div>
              ${slot(this.atoms[0].atom)}
            </div>
            <ul class="molecule_list__list">

              ${slot(this.atoms[1].atom)}

              ${slot(this.atoms[2].atom)}

              ${slot(this.atoms[3].atom)}

              ${slot(this.atoms[4].atom)}

              ${slot(this.atoms[5].atom)}

              ${slot(this.atoms[6].atom)}

              ${slot(this.atoms[7].atom)}

              ${slot(this.atoms[8].atom)}

              ${slot(this.atoms[9].atom)}

            </ul>
        </div>
  `;
  }

  this.bindScript= async function() {
    console.log("HELLO")
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }

    for (let func of this.functions) {


      if (await func.functionCall){
      console.log("molecule")
        await func.functionCall();}
    }
  }
}