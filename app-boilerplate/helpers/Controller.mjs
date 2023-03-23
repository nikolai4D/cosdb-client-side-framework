

import { View } from "../../core/View.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";



export function Controller() {
  View.call(this);

  this.viewTemplate = null;

  this.model = null;

  this.getViewTemplate = async function() {
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
  
    // Instantiate the component
    const viewTemplateCom = new viewTemplateComponent[file]();

    viewTemplateCom.id = viewTemplate.id;

    return viewTemplateCom;
  
  };

  this.addComponentsInTemplateSlotConstructors = async () => {

    // loop through slots in viewTemplate
    for (let slot of this.viewTemplate.slots) {

      const slotModels = this.model.slots.filter(slot => slot.parentId === this.viewTemplate.id);
        let specificSlot =  slotModels.find(slotModel => slotModel.value === slot.slot)

        if (specificSlot) {
          let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)
          if (specificComponent) {
            const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)
            const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id)
            const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id)


            // if the organism exists in the model
            if (organismModel !== undefined) {
              // set the slot of viewTemplate to the be the value of the organism
              slot.slot = organismModel.value;
              // for that slot in viewTemplate, set component to be organism
              slot.component = await createComponent("organisms", organismModel.value)

              if (slot.component.functions){
                await processFunction(this.model, slot.component, organismModel)
              }

              // next step would be to decide if the organism contains other organisms, molecules or atoms
              if(slot.component){
                if (slot.component.organisms) {
                   processOrganisms(this.model, slot.component, organismModel)
              }

              if (slot.component.molecules) {

                  for (let [index, subCompMolecule] of slot.component.molecules.entries()) {

                    let subSubSubComp = subCompMolecule.component
                    let subSubSubCompModels = this.model.molecules.filter(mol => mol.parentId ===  organismModel.id)

                    if (subSubSubCompModels.length > 1) console.log("more than one molecule")

                    if (subSubSubComp.functions) 

                    await processFunction(this.model, subSubSubComp, subSubSubCompModels[index])

                    if (subSubSubComp.atoms){
                      processAtoms(this.model, subSubSubComp, [subSubSubCompModels[index]])
                    }
                  }
              }

              if (slot.component.atoms) {
                processAtoms(this.model, slot.component, slotModels)
                }
              }
            }

          if (moleculeModel !== undefined){

            slot.slot = moleculeModel.value;
            slot.component = await createComponent("molecules", moleculeModel.value)

            // next step would be to decide if the molecule contains other molecules, molecules or atoms
            if(slot.component){
              if (slot.component.atoms) {
                processAtoms(this.model, slot.component, [moleculeModel])
              }
            }
          }

          if (atomModel !== undefined){

            slot.slot = atomModel.value;
            slot.component = await createComponent("atoms", atomModel.value)

            if(slot.component){
              assignAtomValue(this.model.atomValues, slot.component, [atomModel], 0)
              }
            }
          }
        }
      }
      return this.viewTemplate.slots;
  };

  this.addBindScriptToViewTemplate = async () => {
    let component = this.viewTemplate;
        component.bindScript = async function() {
        for await (let slot of component.slots) {
          if (await slot.component)
            await component.fillSlot(slot.slot, slot.component.getElement())
      }
    }
  };

  this.template = async () => {
    this.viewTemplate = await this.getViewTemplate();
    this.viewTemplate.slots = await this.addComponentsInTemplateSlotConstructors();
    await this.addBindScriptToViewTemplate();
    return this.viewTemplate ;
  }
}


const createComponent = async (type, file) => {
  const pathToComponent = `../../components/${type}/${file}.mjs`;
  const Component = await importModuleFromFile(pathToComponent, file)
  return new Component[file]();
}

const createAction = async (file) => {
  const pathToAction = `../../data-mgmt/actions/${file}.mjs`;
  const action = await importModuleFromFile(pathToAction, file);
  return action[file];
};

async function processComponents(model, components, parentModel, componentType) {
  for (const [index, component] of components.entries()) {
    const componentModels = model[componentType].filter((compModel) => compModel.parentId === parentModel.id);

    if (component.functions) {
      await processFunction(model, component, componentModels[index]);
    }

    if (component.molecules) {
      await processMolecules(model, component, componentModels);
    }

    if (component.atoms) {
      await processAtoms(model, component, componentModels);
    }
  }
}

async function processOrganisms(model, comp, organismModel) {
  await processComponents(model, comp.organisms, organismModel, "organisms");
}

async function processMolecules(model, component, componentModels) {
  await processComponents(model, component.molecules, componentModels[0], "molecules");
}

async function processAtoms(model, component, componentModels) {
  await processComponents(model, component.atoms, componentModels[0], "atoms");
}


const processFunction = async (model, component, componentModel) => {
  const functionModels = model.functions.filter((func) => func.parentId === componentModel.id);

  for (const func of functionModels) {
    const [, funcId] = func.key.split(" ");
    const compFunc = component.functions.find((aFunc) => aFunc.id === funcId);

    compFunc.function = func.value;
    compFunc.functionCall = await createAction(func.value);
    compFunc.parameters = func.parameters;
  };
};

