

import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
import { ViewTemplate_dummy2 } from "../../components/viewTemplates/ViewTemplate_dummy2.mjs";
import { State } from "../State.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";



export function Controller() {
  View.call(this);


  this.childComponent = null;

  this.slotsFromModel = null;

  this.model = null;

  this.getComponent = async function() {
    this.model = await readModel();
  
    // Get the view title from the URL to find the corresponding view from the model
    const path = window.location.pathname.slice(1);
  
    // Find the view in the model using the path
    const view = this.model.views.find(view => view.value === path);
    if (!view) {
      throw new Error(`View not found for path: ${path}`);
    }
  
    // Find the viewTemplate in the model using the view's ID as the parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    if (!viewTemplate) {
      throw new Error(`ViewTemplate not found for view ID: ${view.id}`);
    }
  
    // Get the name and path of the viewTemplate component file
    const file = viewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;
  
    // Import the viewTemplate component
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);
  
    // Filter the slots based on the viewTemplate's ID
    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id);
  
    // Instantiate the component
    let component = new viewTemplateComponent[file]();
  
    return component;
  };

  this.getComponents = async () => {}

  this.getSlots = async () => {

    const processOrganisms = async (slotComponent, organismModel) => {
      for (let organism of slotComponent.organisms) {
        let organismComponent = organism.component;
        let organismModels = this.model.organisms.filter(org => org.parentId === organismModel.id);
    
        if (organismComponent.functions) {
          // Perform necessary actions with organismComponent.functions
        }
    
        if (organismComponent.molecules) {
          await processMolecules(organismComponent, organismModels);
        }
      }
    };

    const processMolecules = async (subSubComp, subSubCompModels) => {
      for (let molecule of subSubComp.molecules) {
        let moleculeComponent = molecule.component;
        let moleculeModels = this.model.molecules.filter(mol => mol.parentId === subSubCompModels[0].id);
    
        if (moleculeComponent.functions) {
          // Perform necessary actions with moleculeComponent.functions
        }
    
        if (moleculeComponent.atoms) {
          await processAtoms(moleculeComponent, moleculeModels);
        }
      }
    };
    
    const processAtoms = async (moleculeComponent, moleculeModels) => {
      for (let [index, atom] of moleculeComponent.atoms.entries()) {
        let atomComponent = atom.component;
        let atomModels = this.model.atoms.filter(at => at.parentId === moleculeModels[0].id);
    
        if (atomComponent.functions) {
          // Perform necessary actions with atomComponent.functions
        }
    
        if (atomComponent.value) {
          let atomValueModel = this.model.atomValues.find(at => at.parentId === atomModels[index].id);
          atomComponent.value = [{ value: atomValueModel.value }];
        }
      }
    };



    // get viewTemplate from model
    let component = this.childComponent

    // loop through slots in viewTemplate
    for (let slot of component.slots) {

      // get the slot from the model
        let specificSlot =  this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)

        // if the slot exists in the model
        if (specificSlot) {

          // get the component from the model with the slot id as parentId
          let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)

          // if the component exists in the model
          if (specificComponent) {

            // find organism with the component id as parentId
            const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)

            // find molecule with the component id as parentId
            const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id)

            // find atom with the component id as parentId
            const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id)



            // if the organism exists in the model
            if (organismModel) {

              // set the slot of viewTemplate to the be the value of the organism
              slot.slot = organismModel.value;

              // get the name of the organism from the model and import it from the organisms folder
              const fileOrganism = organismModel.value;
              const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
              const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
              let organismComp =  new organismComponent[fileOrganism]();

              // for that slot in viewTemplate, set component to be organism
              slot.component = organismComp

              // next step would be to decide if the organism contains other organisms, molecules or atoms
              if(slot.component){

                  if (slot.component.organisms) {
                    await processOrganisms(slot.component, organismModel);
                  }


                  if (slot.component.molecules) {
                    await processMolecules(slot.component, [organismModel]);
                  }

                  if (slot.component.atoms) {
                    await processAtoms(slot.component, [organismModel]);
                  }
          }

          }
          
          if (moleculeModel){

            // set the slot of viewTemplate to the be the value of the organism
            slot.slot = moleculeModel.value;

            // get the name of the organism from the model and import it from the organisms folder
            const fileMolecule = moleculeModel.value;
            const pathToComponent = `../../components/molecules/${fileMolecule}.mjs`;
            const moleculeComponent = await importModuleFromFile(pathToComponent, fileMolecule)
            let moleculeComp =  new moleculeComponent[fileMolecule]();

            // for that slot in viewTemplate, set component to be molecule
            slot.component = moleculeComp

            // next step would be to decide if the molecule contains other molecules, molecules or atoms
            if(slot.component){
              if (slot.component.atoms) {
                if (slot.component.atoms) {
                  await processAtoms(slot.component, moleculeComp);
                }

                    }
                    
                  }

                }

          if (atomModel){

            // set the slot of viewTemplate to the be the value of the organism
            slot.slot = atomModel.value;

            // get the name of the organism from the model and import it from the organisms folder
            const fileAtom = atomModel.value;
            const pathToComponent = `../../components/atoms/${fileAtom}.mjs`;
            const atomComponent = await importModuleFromFile(pathToComponent, fileAtom)
            let atomComp =  new atomComponent[fileAtom]();

            // for that slot in viewTemplate, set component to be molecule
            slot.component = atomComp

            // next step would be to decide if the molecule contains other molecules, molecules or atoms
            if(slot.component){
              if (slot.component.value) {

                          let atomValueModel = this.model.atomValues.find(at => at.parentId === atomModel.id)

                          slot.component.value = [{value: atomValueModel.value}]

                    }

                  }

                }
        }
        }
      }
  };

  this.bindNewScripts = async () => {
    let component = this.childComponent;

         component.bindScript = async function() {
          for await (let slot of component.slots) {
            if (await slot.component)
            await component.fillSlot(slot.slot, slot.component.getElement())
        }
      }
    };


  this.template = async () => {
    this.childComponent = await this.getComponent();
    await this.getSlots();
    await this.bindNewScripts();

     this.childComponent.model = this.model;

    return  this.childComponent ;

  }

}
