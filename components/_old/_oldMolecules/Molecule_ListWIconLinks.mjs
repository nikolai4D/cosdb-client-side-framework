import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Link } from "../atoms/Atom_Link.mjs";

export function Molecule_ListWIconLinks() {
  Component.call(this);

  this.atoms = [
        {
            id: 1,
            atom: "Atom_Icon",
            component:  new Atom_Icon()
        },
        {
            id: 2,
            atom: "Atom_Link",
            component: new Atom_Link()
        },
        {
            id: 3,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 4,
            atom: "Atom_Link",
            component: new Atom_Link()
        },
        {
            id: 5,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 6,
            atom: "Atom_Link",
            component: new Atom_Link()
        },
        {
            id: 7,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 8,
            atom: "Atom_Link",
            component: new Atom_Link()
        },
        {
            id: 9,
            atom: "Atom_Icon",
            component: new Atom_Icon()
        },
        {
            id: 10,
            atom: "Atom_Link",
            component: new Atom_Link()
        },
    ]

  this.functions = [
    { id: 1, function: "placeholder" },
    { id: 2, function: "placeholder" },
  ];

  this.getHtml = function(){


    return `
            <ul>
                <div class="molecule_icon_and_link">
                    ${slot(this.atoms[0].atom)}
                    ${slot(this.atoms[1].atom)}
                </div>

                <div class="molecule_icon_and_link">
                    ${slot(this.atoms[2].atom)}
                    ${slot(this.atoms[3].atom)}
                </div>

                <div class="molecule_icon_and_link">
                    ${slot(this.atoms[4].atom)}
                    ${slot(this.atoms[5].atom)}
                </div class="molecule_icon_and_link">

                <div class="molecule_icon_and_link">
                    ${slot(this.atoms[6].atom)}
                    ${slot(this.atoms[7].atom)}
                </div>

                <div class="molecule_icon_and_link">
                    ${slot(this.atoms[8].atom)}
                    ${slot(this.atoms[9].atom)}
                </div>

            </ul>

  `;
  }

  this.bindScript= async function() {
    for (let atom of this.atoms) {
      await this.fillSlot(atom.atom, atom.component.getElement())
    }
  }
}