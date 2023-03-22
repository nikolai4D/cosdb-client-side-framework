import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
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
      component: new Molecule_HeadingSearchButton(),
    },
    {
      id: 2,
      molecule: "Molecule_ListWHeading",
      component: new Molecule_ListWHeading(),
    },
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

  this.getHtml = function () {
    return `
      <div class="organism_list-all-search">
        ${slot(this.molecules[0].molecule)}
        <div id="organism_all_lists" class="organism_list-all-search__lists">
          ${this.molecules.slice(1).map((mol) => slot(mol.molecule)).join("")}
        </div>
      </div>
    `;
  };

  this.bindScript = async function () {
    const type = "processes";

    for (const func of this.functions) {
      if (func.functionCall) {
        await func.functionCall(type);

        await State[type];

        const data = State[type];

        updateMolecules(data);
      }
    }

    renderMolecules();
  };

  const updateMolecules = (data) => {
    const indexOfComp = this.molecules.findIndex(
      (obj) =>
        obj.component.constructorKey ===
        new Molecule_ListWHeading().constructorKey
    );

    let newMolecules = [];

    for (const [index, molecule] of data.entries()) {

      // Creating a list (molecule)
      const newMolecule = new Molecule_ListWHeading();
      newMolecules.push({
        id: index + 1,
        molecule: newMolecule.constructorKey,
        component: newMolecule,
      });

      // Creating header and list items (atoms) to molecule
      const newAtomHeading = new Atom_Heading4();
      const firstAtom = {
        value: molecule.letter,
        id: 1,
        atom: "Atom_Heading4",
        component: newAtomHeading,
      };
      newAtomHeading.value = [firstAtom];
      newMolecule.atoms = [firstAtom];

      for (const [index2, item] of molecule.title.entries()) {
        const newAtomListItem = new Atom_ListItem();
        newAtomListItem.value = [{ value: item }];

        newMolecule.atoms.push({
          value: item,
          id: index2,
          atom: "Atom_ListItem",
          component: newAtomListItem,
        });
      }
    }

    // Replacing placeholder molecule with new
    this.molecules.splice(indexOfComp, 1, ...newMolecules);
  };

  const renderMolecules = () => {
    // Replacing placeholder DOM elements (slots are rendered at this point) with new molecule DOM elements 
    this.element.lastElementChild.innerHTML = "";
    const moleculesSlots = this.element.lastElementChild;

    for (const mol of this.molecules) {
      moleculesSlots.appendChild(mol.component.getElement());
    }
  };
}
