import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { State } from "../../data-mgmt/state.mjs";
import { Organism_ModalProcess } from "./Organism_ModalProcess.mjs";

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
        <div id="modal-processView"></div>

      </div>
    `;
  };

  this.bindScript = async function () {
    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
    for (const func of this.functions) {
      if (func.functionCall) {
        let type = window.location.pathname.slice(1)
        let url = func.parameters;
        await func.functionCall({type, url});
        await State[type];
        const data = State[type];

        updateMolecules(data);
      }
    }
    renderMolecules();

    this.getElement().querySelector("#organism_all_lists").addEventListener("click", (e) => {    

      const modalId = document.getElementById('modal-processView')
      
      modalId.innerHTML = `
          <div>
              ${slot("new-modal")}
          </div>
          `
      this.modal = new Organism_ModalProcess()

      this.fillSlot("new-modal", this.modal.getElement());
  });

  };

  const createMolecule = (MoleculeClass, id) => {
    const molecule = new MoleculeClass();
    return {
      id,
      molecule: molecule.constructorKey,
      component: molecule,
    };
  };
  
  const createAtom = (AtomClass, value, id) => {
    const atom = new AtomClass();
    atom.value = Array.isArray(value) ? value : [{ value }];
  
    return {
      value,
      id,
      atom: AtomClass.name,
      component: atom,
    };
  };
  
  const updateMolecules = (data) => {
    const indexOfComp = this.molecules.findIndex(
      (obj) => obj.component.constructorKey === new Molecule_ListWHeading().constructorKey
    );
  
    const newMolecules = data.map((molecule, index) => {
      const newMolecule = createMolecule(Molecule_ListWHeading, index + 1);
  
      const headingAtom = createAtom(Atom_Heading4, molecule.letter, 1);
      newMolecule.component.atoms = [headingAtom];
  
      molecule.title.forEach((item, index2) => {
        const listItemAtom = createAtom(Atom_ListItem, item, index2);
        newMolecule.component.atoms.push(listItemAtom);
      });
  
      return newMolecule;
    });
  
    this.molecules.splice(indexOfComp, 1, ...newMolecules);
  };

  const renderMolecules = () => {
    // Replacing placeholder DOM elements (slots are rendered at this point) with new molecule DOM elements 

   let content= document.getElementById("organism_all_lists")
   content.innerHTML = ""
   const moleculesSlots = content

    for (const [index, mol] of this.molecules.entries()) {
      if (index !== 0) moleculesSlots.appendChild(mol.component.getElement());

    }
  };
}
