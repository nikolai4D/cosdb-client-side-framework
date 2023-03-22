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

  const createHeadingAtom = (letter, id) => {
    const newAtom = new Atom_Heading4();
    return {
      value: letter,
      id,
      atom: 'Atom_Heading4',
      component: newAtom,
    };
  };
  
  const createListItemAtom = (item, id) => {
    const newAtom = new Atom_ListItem();
    newAtom.value = [{ value: item }];
  
    return {
      value: item,
      id,
      atom: 'Atom_ListItem',
      component: newAtom,
    };
  };
  
  const createNewMolecule = (moleculeData, id) => {
    const newComponent = new Molecule_ListWHeading();
    const headingAtom = createHeadingAtom(moleculeData.letter, 1);
  
    newComponent.atoms = [headingAtom];
  
    const listItemAtoms = moleculeData.title.map((item, index) =>
      createListItemAtom(item, index + 2)
    );
  
    newComponent.atoms.push(...listItemAtoms);
  
    return {
      id,
      molecule: newComponent.constructorKey,
      component: newComponent,
    };
  };
  
  const updateMolecules = (data) => {
    const indexOfComp = this.molecules.findIndex(
      (obj) =>
        obj.component.constructorKey ===
        new Molecule_ListWHeading().constructorKey
    );
  
    const newMolecules = data.map((molecule, index) =>
      createNewMolecule(molecule, index + 1)
    );
  
    this.molecules.splice(indexOfComp, 1, ...newMolecules);
  };
  
  const renderMolecules = () => {
    this.element.lastElementChild.innerHTML = "";
    const moleculesSlots = this.element.lastElementChild;

    for (const mol of this.molecules) {
      moleculesSlots.appendChild(mol.component.getElement());
    }
  };
}
