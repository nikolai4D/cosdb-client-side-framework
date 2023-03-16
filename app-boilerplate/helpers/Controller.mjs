

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

    const createComponent = async (type, componentName) => {
      const filePath = `../../components/${type}s/${componentName}.mjs`;
      const componentModule = await importModuleFromFile(filePath, componentName);
      return new componentModule[componentName]();
    };
    
    const processOrganisms = async (slotComponent, organismModel) => {
      for (const organism of slotComponent.organisms) {
        const organismComponent = organism.component;
        const organismModels = this.model.organisms.filter(org => org.parentId === organismModel.id);
    
        if (organismComponent.functions) {
          // Perform necessary actions with organismComponent.functions
        }
    
        if (organismComponent.molecules) {
          await processMolecules(organismComponent, organismModels);
        }
      }
    };
    
    const processMolecules = async (parentComponent, parentModels) => {
      for (const molecule of parentComponent.molecules) {
        const moleculeComponent = molecule.component;
        const moleculeModels = this.model.molecules.filter(mol => mol.parentId === parentModels[0].id);
    
        if (moleculeComponent.functions) {
          // Perform necessary actions with moleculeComponent.functions
        }
    
        if (moleculeComponent.atoms) {
          await processAtoms(moleculeComponent, [moleculeModels]);
        }
      }
    };
    
    const processAtoms = async (moleculeComponent, moleculeModels) => {
      if (moleculeModels.length === 0) {
        return;
      }
      for (const [index, atom] of moleculeComponent.atoms.entries()) {
        const atomComponent = atom.component;
        const atomModels = this.model.atoms.filter(at => at.parentId === moleculeModels[0].id);
    
        if (atomComponent.functions) {
          // Perform necessary actions with atomComponent.functions
        }
    
        if (atomComponent.value) {
          const atomValueModel = this.model.atomValues.find(at => {
            // Make sure the atom model exists at the given index before accessing it
            return atomModels[index] && at.parentId === atomModels[index].id;
          });
    
          if (atomValueModel) {
            atomComponent.value = [{ value: atomValueModel.value }];
          }
        }
      }
    };
    
    const component = this.childComponent;
    
    for (const slot of component.slots) {
      const specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot);
    
      if (specificSlot) {
        const specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id);
    
        if (specificComponent) {
          const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id);
          const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id);
          const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id);
    
          if (organismModel) {
            slot.slot = organismModel.value;
            slot.component = await createComponent('organism', organismModel.value);
          } else if (moleculeModel) {
            slot.slot = moleculeModel.value;
            slot.component = await createComponent('molecule', moleculeModel.value);
          } else if (atomModel) {
            slot.slot = atomModel.value;
            slot.component = await createComponent('atom', atomModel.value);
          }
    
          if (slot.component) {
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
