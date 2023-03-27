import { Component } from "../../core/Component.mjs";
import { slot } from "../../core/helpers.mjs";
import { Molecule_ListWHeading } from "../molecules/Molecule_ListWHeading.mjs";
import { Molecule_HeadingSearchButton } from "../molecules/Molecule_HeadingSearchButton.mjs";
import { Atom_ListItem } from "../atoms/Atom_ListItem.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { State } from "../../data-mgmt/state.mjs";
import { Organism_ModalProcessPrep } from "./Organism_ModalProcessPrep.mjs";

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
      <div class="organism_list-all-search">
        ${slot(this.molecules[0].molecule)}
        <div id="organism_all_lists" class="organism_list-all-search__lists">
          ${this.molecules.slice(1).map((mol) => slot(mol.molecule)).join("")}
        </div>
        ${slot(this.organisms[0].organism)}

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
    let that = this;
    for (let org of this.organisms) {
      await this.fillSlot(org.organism, org.component.getElement())

      // org.component.parent = that.element;
      // let allLists = that.element.querySelector("#organism_all_lists").children
      // let allListObjects = []
      // for(let child of allLists){
      //   // console.log(child.children[1].children, "childnode")
      //   allListObjects.push(...child.children[1].children)
      // }
      // org.component.parent = allListObjects
      // console.log(org.component.parent, "org.component.parent");
      // console.log(allLists, "allLists");

      // let elementsArray = that.element.querySelectorAll("li");
      // console.log(elementsArray, "elementsArray");
      // org.component.parent = await elementsArray;

    }

  };

  const changeData = async (data, filteredData) => {
    for (let mol of this.molecules) {
      for (let atom of mol.component.atoms) {

        atom.component.oninput = async (e) => {
          if (e.target.value === "") { filteredData = [...data] }
          else {
            filteredData = [...data].map(item =>
                {
                let theTitle = item.title.filter( (titl) => titl.toLowerCase().includes(e.target.value.toLowerCase()))
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
    this.molecules= [...newMolecules]
  };

  const renderMolecules = () => {
    // Replacing placeholder DOM elements (slots are rendered at this point) with new molecule DOM elements 

   let content= document.getElementById("organism_all_lists")
   content.innerHTML = ""
   const moleculesSlots = content

    for (const  mol of this.molecules) {
      moleculesSlots.appendChild(mol.component.getElement());

    }
  };
}
