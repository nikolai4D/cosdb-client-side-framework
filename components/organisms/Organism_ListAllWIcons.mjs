import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Molecule_HeadingIconText } from "../molecules/Molecule_HeadingIconText.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";
import { Atom_Text1 } from "../atoms/Atom_Text1.mjs";
import { Atom_Icon } from "../atoms/Atom_Icon.mjs";
import { Atom_Heading2 } from "../atoms/Atom_Heading2.mjs";
import { State } from "../../data-mgmt/state.mjs";
import { Organism_ModalProcessPrep } from "./Organism_ModalProcessPrep.mjs";

export function Organism_ListAllWIcons() {
  Component.call(this);

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_HeadingSearchButton",
      component: new Molecule_HeadingSearchButton(),
    },
    {
      id: 2,
      molecule: "Molecule_HeadingIconText",
      component: new Molecule_HeadingIconText(),
    },
  ];

  this.organisms = [
    {
      id: 1,
      organism: "Organism_ModalProcessPrep",
      component: new Organism_ModalProcessPrep(),
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
      <div class="organism_list-all-search-icons">
        ${slot(this.molecules[0].molecule)}
        <div id="organism_all_lists" class="organism_list-all-search-icons__lists">
          ${this.molecules.slice(1).map((mol) => slot(mol.molecule)).join("")}
        </div>
        <div id="modal-slot">
        ${slot(this.organisms[0].organism)}
        </div>
      </div>
    `;
  };
  

  this.bindScript = async function () {

    let data, filteredData = null

    for (const func of this.functions) {
      if (func.functionCall) {
        let type = window.location.pathname.slice(1)
        let url = func.parameters;
        await func.functionCall({type, url});
        await State[type];
        data = State[type];
        filteredData = [...State[type]]
      }
    }
    changeData(data, filteredData)

    for (let mol of this.molecules) {
      await this.fillSlot(mol.molecule, mol.component.getElement())
    }
    updateMolecules(data);
    await renderMolecules();

  };

  const changeData = async (data, filteredData) => {
    for (let mol of this.molecules) {
      for (let atom of mol.component.atoms) {

        atom.component.oninput = async (e) => {
          if (e.target.value === "") { filteredData = [...data] }
          else {
            filteredData = [...data].map(item =>
                {
                let theTitle = item.title.filter( (titl) => titl.title.toLowerCase().includes(e.target.value.toLowerCase()))
                return {
                  letter: item.letter, title: theTitle
                }
              })
            filteredData = filteredData.filter( (item) => item.title.length > 0)
          }
          updateMolecules(filteredData);
          renderMolecules();
          }
        }
      }
      
  }

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
    const newMolecules = []
    const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum malesuada est, non varius elit tristique sit amet. Ut vel hendrerit nibh. In a pharetra magna. Praesent sit amet mauris lectus.`
    
    data.forEach((molecule, index) => {

      molecule.title.forEach((item, index2) => {
        const newMolecule = createMolecule(Molecule_HeadingIconText, index + 1);
        const headingAtom = createAtom(Atom_Heading2,item.title, 1);
        const iconAtom = createAtom(Atom_Icon, "bi bi-book", index2);
        const listItemAtom = createAtom(Atom_Text1, description, index2);
        newMolecule.component.atoms = [];        
        newMolecule.component.atoms.push(iconAtom);
        newMolecule.component.atoms.push(headingAtom);
        newMolecule.component.atoms.push(listItemAtom);
        newMolecules.push(newMolecule)
      });
  
    });
    this.molecules= [...newMolecules]
  };

  const renderMolecules = async () => {
    // Replacing placeholder DOM elements (slots are rendered at this point) with new molecule DOM elements 

   let content= document.getElementById("organism_all_lists")
   content.innerHTML = ""
   const moleculesSlots = content
   const anArray = []
    for (const  mol of this.molecules) {
      await moleculesSlots.appendChild(mol.component.getElement());
    }
    // for await (const child of moleculesSlots.children) {
    //   for await (const li of child.children[1].children){
    //     anArray.push(await li)
    //   }
    // }
    
    // for (let org of this.organisms) {
    //   let newOrg = new Organism_ModalProcessPrep()
    //   newOrg.moleculeLeft.header = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[0].component.atoms[0].component.value[0].value
    //   newOrg.moleculeMiddle.header = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[1].component.atoms[0].component.value[0].value
    //   newOrg.moleculeRight.header = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[2].component.atoms[0].component.value[0].value

    //   newOrg.moleculeLeft.body = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[0].component.atoms[1].component.value[0].value
    //   newOrg.moleculeMiddle.body = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[1].component.atoms[1].component.value[0].value
    //   newOrg.moleculeRight.body = this.organisms[0].component.organisms[0].component.organisms[0].component.organisms[0].component.molecules[2].component.atoms[1].component.value[0].value

    //   newOrg.parent = await anArray;

    //   let slotContent= document.getElementById("modal-slot")
    //   slotContent.innerHTML = ""
    //   slotContent.appendChild(newOrg.getElement());

    // }
  };
}
