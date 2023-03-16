

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


  this.getSlots = async () => {
    const { organisms, molecules, atoms, atomValues } = this.model;
  
    const findModelsByParentId = (models, parentId) => {
      return models.filter(model => model.parentId === parentId);
    };
  
    const findModelByParentId = (models, parentId) => {
      return models.find(model => model.parentId === parentId);
    };
  
    const overWriteAtomValue = async (component, componentModel) => {
      let atomValueModel = findModelByParentId(atomValues, componentModel.id);
      component.value = [{ value: atomValueModel.value }];
    };
  
    const processComponents = async (components, componentModels, childKey, childModels) => {
      for (const component of components) {
        const componentInstance = component.component;
        const relatedModels = findModelsByParentId(childModels, componentModels[0]?.id);
  
        if (componentInstance.functions) {
          // Perform necessary actions with componentInstance.functions
        }
  
        if (componentInstance[childKey]) {
          await processComponents(componentInstance[childKey], relatedModels, childKey === 'organisms' ? 'molecules' : 'atoms', childKey === 'organisms' ? molecules : atoms);
        }
      }
    };
  
    const createComponent = async (type, componentName) => {
      const filePath = `../../components/${type}s/${componentName}.mjs`;
      const componentModule = await importModuleFromFile(filePath, componentName);
      return new componentModule[componentName]();
    };
  
    // get viewTemplate from model
    let component = this.childComponent;
  
    // loop through slots in viewTemplate
    for (let slot of component.slots) {
      // get the slot from the model
      let specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot);
  
      // if the slot exists in the model
      if (specificSlot) {
        // get the component from the model with the slot id as parentId
        let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id);
  
        // if the component exists in the model
        if (specificComponent) {
          const componentTypes = [
            { name: 'organism', models: organisms },
            { name: 'molecule', models: molecules },
            { name: 'atom', models: atoms },
          ];
  
          for (const componentType of componentTypes) {
            const componentModel = findModelByParentId(componentType.models, specificComponent.id);
  
            if (componentModel) {
              slot.slot = componentModel.value;
              slot.component = await createComponent(componentType.name, componentModel.value);
  
              if (slot.component) {
                if (componentType.name === 'atom' && slot.component.value) {
                  overWriteAtomValue(slot.component, componentModel);
                } else if (slot.component[`${componentType.name}s`]) {
                  await processComponents(slot.component[`${componentType.name}s`], [componentModel], componentType.name === 'organism' ? 'molecules' : 'atoms', componentType.name === 'organism' ? molecules : atoms);
                }
              }
              break;
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
