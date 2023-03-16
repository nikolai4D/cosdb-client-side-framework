import { View } from "../../core/View.mjs";
import { State } from "../State.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";

export function Controller() {
  View.call(this);

  this.childComponent = null;
  this.slotsFromModel = null;
  this.model = null;

  this.getComponent = async () => {
    this.model = await readModel();

    // Get the view title from the URL to get the view from the model
    const path = window.location.pathname.slice(1);
    const view = this.model.views.find(view => view.value === path);
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    const file = viewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;

    // Import the viewTemplate prototype
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);
    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id);

    let component = new viewTemplateComponent[file]();
    return component;
  };

  this.getComponents = async () => {};

  // this.getSlots = async () => {
  //   let component = this.childComponent;

  //   // Loop through slots in viewTemplate
  //   for (let slot of component.slots) {
  //     // Get the slot from the model
  //     let specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot);

  //     // If the slot exists in the model
  //     if (specificSlot) {
  //       // Get the component from the model with the slot id as parentId
  //       let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id);

  //       // If the component exists in the model
  //       if (specificComponent) {
  //         // Find the appropriate model based on the parentId
  //         const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id);
  //         const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id);
  //         const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id);

  //         // Process the model depending on its type (organism, molecule, atom)
  //         // The processModel function is defined below
  //         await processModel(slot, organismModel, 'organisms');
  //         await processModel(slot, moleculeModel, 'molecules');
  //         await processModel(slot, atomModel, 'atoms');
  //       }
  //     }
  //   }
  // };

// A helper function to process the model based on its type
const processModel = async (slot, model, type) => {
  if (model) {
    slot.slot = model.value;

    const fileType = model.value;
    const pathToComponent = `../../components/${type}/${fileType}.mjs`;
    const component = await importModuleFromFile(pathToComponent, fileType);
    const compInstance = new component[fileType]();

    slot.component = compInstance;

// Process nested components if they exist
if (slot.component) {
  const processNested = (comp, type) => {
    if (comp[type]) {
      for (let [index, nestedComp] of comp[type].entries()) {
        const nestedCompModel = this.model[type].find(x => x.parentId === comp.id);
        if (nestedCompModel) {
          const atomValueModel = this.model.atomValues.find(av => av.parentId === nestedCompModel.id);
          if (atomValueModel) {
            nestedComp.value = [{ value: atomValueModel.value }];
          }

          // Process further nested components
          processNested(nestedComp, 'organisms');
          processNested(nestedComp, 'molecules');
          processNested(nestedComp, 'atoms');
        }
      }
    }
  };

  processNested(slot.component, 'organisms');
  processNested(slot.component, 'molecules');
  processNested(slot.component, 'atoms');
}

  }
};

this.getSlots = async () => {
  let component = this.childComponent;

  for (let slot of component.slots) {
    let specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot);

    if (specificSlot) {
      let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id);

      if (specificComponent) {
        const types = ['organisms', 'molecules', 'atoms'];
        for (const type of types) {
          const model = this.model[type].find(c => c.parentId === specificComponent.id);
          if (model) {
            await processModel(slot, model, type);
            break;
          }
        }
      }
    }
  }
};
//   // A helper function to process the model based on its type
// // A helper function to process the model based on its type
// const processModel = async (slot, model, type) => {
//   if (model) {
//     slot.slot = model.value;

//     const fileType = model.value;
//     const pathToComponent = `../../components/${type}/${fileType}.mjs`;
//     const component = await importModuleFromFile(pathToComponent, fileType);
//     const compInstance = new component[fileType]();

//     slot.component = compInstance;

//     // Process nested components if they exist
//     if (slot.component) {
//       if (type === 'organisms') {
//         // Process nested organisms, molecules, and atoms
//         if (slot.component.organisms) {
//           for (let organism of slot.component.organisms) {
//             const organismModel = this.model.organisms.find(org => org.parentId === organism.id);
//             await processModel(organism, organismModel, 'organisms');
//           }
//         }
//         if (slot.component.molecules) {
//           for (let molecule of slot.component.molecules) {
//             const moleculeModel = this.model.molecules.find(mol => mol.parentId === molecule.id);
//             await processModel(molecule, moleculeModel, 'molecules');
//           }
//         }
//         if (slot.component.atoms) {
//           for (let atom of slot.component.atoms) {
//             const atomModel = this.model.atoms.find(at => at.parentId === atom.id);
//             await processModel(atom, atomModel, 'atoms');
//           }
//         }
//       } else if (type === 'molecules') {
//         // Process nested molecules and atoms
//         if (slot.component.molecules) {
//           for (let molecule of slot.component.molecules) {
//             const moleculeModel = this.model.molecules.find(mol => mol.parentId === molecule.id);
//             await processModel(molecule, moleculeModel, 'molecules');
//           }
//         }
//         if (slot.component.atoms) {
//           for (let atom of slot.component.atoms) {
//             const atomModel = this.model.atoms.find(at => at.parentId === atom.id);
//             await processModel(atom, atomModel, 'atoms');
//           }
//         }
//       } else if (type === 'atoms') {
//         // Process nested atoms
//         if (slot.component.atoms) {
//           for (let atom of slot.component.atoms) {
//             const atomModel = this.model.atoms.find(at => at.parentId === atom.id);
//             await processModel(atom, atomModel, 'atoms');
//           }
//         }
//       }
//     }
//   }
// };


// ...

this.bindNewScripts = async () => {
  let component = this.childComponent;

  component.bindScript = async function () {
    for await (let slot of component.slots) {
      if (await slot.component) {
        await component.fillSlot(slot.slot, slot.component.getElement());
      }
    }
  }
};

this.template = async () => {
  this.childComponent = await this.getComponent();
  await this.getSlots();
  await this.bindNewScripts();

  this.childComponent.model = this.model;

  return this.childComponent;
}
}



// import { View } from "../../core/View.mjs";
// import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
// import { ViewTemplate_dummy2 } from "../../components/viewTemplates/ViewTemplate_dummy2.mjs";
// import { State } from "../State.mjs";
// import { importModuleFromFile } from "../../core/helpers.mjs";
// import { readModel } from "./readModel.mjs";



// export function Controller() {
//   View.call(this);


//   this.childComponent = null;

//   this.slotsFromModel = null;

//   this.model = null;

//   this.getComponent = async () => { 

//     this.model = await readModel();

//     // getting the view title from the url to get the view from model
//     const path = window.location.pathname.slice(1)
//     // getting the view from the model to get the id
//     const view = this.model.views.find(view => view.value === path)
//     // getting the viewTemplate from the model with the view id as parentId
//     const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id)
//     // getting the name of the viewTemplate
//     const file = viewTemplate.value;
//     // getting the path to the viewTemplate prototype
//     const pathToComponent = `../../components/viewTemplates/${file}.mjs`
//     // importing the viewTemplate prototype

//     const viewTemplateComponent = await importModuleFromFile(pathToComponent, file)

//     this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id)

//     let component = new viewTemplateComponent[file]();

//     return component

//   }

//   this.getComponents = async () => {}

//   this.getSlots = async () => {

//     // get viewTemplate from model
//     let component = this.childComponent

//     // loop through slots in viewTemplate
//     for (let slot of component.slots) {

//       // get the slot from the model
//         let specificSlot =  this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)

//         // if the slot exists in the model
//         if (specificSlot) {

//           // get the component from the model with the slot id as parentId
//           let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)

//           // if the component exists in the model
//           if (specificComponent) {

//             // find organism with the component id as parentId
//             const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)

//             // find molecule with the component id as parentId
//             const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id)

//             // find atom with the component id as parentId
//             const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id)

//             // if the organism exists in the model
//             if (organismModel) {

//               // set the slot of viewTemplate to the be the value of the organism
//               slot.slot = organismModel.value;

//               // get the name of the organism from the model and import it from the organisms folder
//               const fileOrganism = organismModel.value;
//               const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
//               const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
//               let organismComp =  new organismComponent[fileOrganism]();

//               // for that slot in viewTemplate, set component to be organism
//               slot.component = organismComp

//               // next step would be to decide if the organism contains other organisms, molecules or atoms
//               if(slot.component){
//                 if (slot.component.organisms) {

//                 // for viewTempalate slot that has an organism, loop through its organisms
//                 for (let subCompOrganism of slot.component.organisms) {

//                   let subSubComp = subCompOrganism.component
//                   let subSubCompModels = this.model.organisms.filter(org => org.parentId === organismModel.id)

//                   if (subSubCompModels.length > 1) console.log("more than one organism")

//                   if (subSubComp.functions) console.log(subSubComp.constructorKey, subSubComp.functions)

//                   if (subSubComp.molecules){

//                     for (let subCompMolecule of subSubComp.molecules) {

//                       let subSubSubComp = subCompMolecule.component
//                       let subSubSubCompModels = this.model.molecules.filter(mol => mol.parentId === subSubCompModels[0].id)

//                       if (subSubSubCompModels.length > 1) console.log("more than one molecule")
    
//                       if (subSubSubComp.functions) console.log(subSubSubComp.constructorKey, subSubSubComp.functions)
    
//                       if (subSubSubComp.atoms){

//                         for (let [index, subCompAtom] of subSubSubComp.atoms.entries()) {

//                           let subSubSubSubComp = subCompAtom.component
//                           let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === subSubSubCompModels[0].id)

//                           if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)
        
//                           if (subSubSubSubComp.value) {

//                             let subSubSubSubSubCompModels = this.model.atomValues.find(at => at.parentId === subSubSubSubCompModels[index].id)

//                              subSubSubSubComp.value = [{value: subSubSubSubSubCompModels.value}]


//                           }


//                           }

//                       }
                      
//                     }

//                   }


//               }
//               }

//               if (slot.component.molecules) {

//                   for (let [index, subCompMolecule] of slot.component.molecules.entries()) {

//                     let subSubSubComp = subCompMolecule.component
//                     let subSubSubCompModels = this.model.molecules.filter(mol => mol.parentId ===  organismModel.id)

//                     if (subSubSubCompModels.length > 1) console.log("more than one molecule")

//                     if (subSubSubComp.functions) console.log(subSubSubComp.constructorKey, subSubSubComp.functions)

//                     if (subSubSubComp.atoms){

//                       for (let [index2, subCompAtom] of subSubSubComp.atoms.entries()) {

//                         let subSubSubSubComp = subCompAtom.component
//                         let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === subSubSubCompModels[index].id)
      
//                         if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)
      
//                         if (subSubSubSubComp.value) {

//                           let subSubSubSubSubCompModels = this.model.atomValues.find(at => at.parentId === subSubSubSubCompModels[index2].id)

//                           subSubSubSubComp.value = [{value: subSubSubSubSubCompModels.value}]


//                         }


//                         }

//                     }
                    
//                   }




//               }

//               if (slot.component.atoms) {


//                   for (let [index, subCompAtom] of slot.component.atoms.entries()) {

//                     let subSubSubSubComp = subCompAtom.component
//                     let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === organismModel.id)

//                     if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)

//                     if (subSubSubSubComp.value) {

//                       let subSubSubSubSubCompModels = this.model.atomValues.filter(at => at.parentId === subSubSubSubCompModels[0].id)

//                       subSubSubSubComp.value = [{value: subSubSubSubSubCompModels[index].value}]

//                     }


//                     }

//               }
//           }

//           }
          
//           if (moleculeModel){

//             // set the slot of viewTemplate to the be the value of the organism
//             slot.slot = moleculeModel.value;

//             // get the name of the organism from the model and import it from the organisms folder
//             const fileMolecule = moleculeModel.value;
//             const pathToComponent = `../../components/molecules/${fileMolecule}.mjs`;
//             const moleculeComponent = await importModuleFromFile(pathToComponent, fileMolecule)
//             let moleculeComp =  new moleculeComponent[fileMolecule]();

//             // for that slot in viewTemplate, set component to be molecule
//             slot.component = moleculeComp

//             // next step would be to decide if the molecule contains other molecules, molecules or atoms
//             if(slot.component){
//               if (slot.component.atoms) {

//                       for (let [index, subCompAtom] of slot.component.atoms.entries()) {

//                         let subSubSubSubComp = subCompAtom.component
//                         let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === moleculeModel.id)

//                         if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)
      
//                         if (subSubSubSubComp.value) {

//                           let subSubSubSubSubCompModels = this.model.atomValues.find(at => at.parentId === subSubSubSubCompModels[index].id)

//                            subSubSubSubComp.value = [{value: subSubSubSubSubCompModels.value}]


//                         }


//                         }

//                     }
                    
//                   }

//                 }

//           if (atomModel){

//             // set the slot of viewTemplate to the be the value of the organism
//             slot.slot = atomModel.value;

//             // get the name of the organism from the model and import it from the organisms folder
//             const fileAtom = atomModel.value;
//             const pathToComponent = `../../components/atoms/${fileAtom}.mjs`;
//             const atomComponent = await importModuleFromFile(pathToComponent, fileAtom)
//             let atomComp =  new atomComponent[fileAtom]();

//             // for that slot in viewTemplate, set component to be molecule
//             slot.component = atomComp

//             // next step would be to decide if the molecule contains other molecules, molecules or atoms
//             if(slot.component){
//               if (slot.component.value) {

//                           let atomValueModel = this.model.atomValues.find(at => at.parentId === atomModel.id)

//                           slot.component.value = [{value: atomValueModel.value}]

//                     }

//                   }

//                 }
//         }
//         }
//       }
//   };

//   this.bindNewScripts = async () => {
//     let component = this.childComponent;

//          component.bindScript = async function() {
//           for await (let slot of component.slots) {
//             if (await slot.component)
//             await component.fillSlot(slot.slot, slot.component.getElement())
//         }
//       }
//     };


//   this.template = async () => {
//     this.childComponent = await this.getComponent();
//     await this.getSlots();
//     await this.bindNewScripts();

//      this.childComponent.model = this.model;

//     return  this.childComponent ;

//   }

// }
