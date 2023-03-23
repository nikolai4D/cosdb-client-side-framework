

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
    validate(view)
    // Find the viewTemplate in the model using the view's ID as the parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    validate(viewTemplate)
  
    // Get the name and path of the viewTemplate component file
    const file = viewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;
  
    // Import the viewTemplate component
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);
    validate(viewTemplateComponent)
  
    // Instantiate the component
    const viewTemplateCom = new viewTemplateComponent[file]();

    viewTemplateCom.id = viewTemplate.id;

    return viewTemplateCom;
  
  };

  this.addComponentsInTemplateSlotConstructors = async () => {

    for (const slot of this.viewTemplate.slots) {
      const slotModels = this.model.slots.filter(slot => slot.parentId === this.viewTemplate.id);

      const matchSlotModel =  slotModels.find(slotModel => slotModel.value === slot.slot)
      validate(matchSlotModel)

      const matchComponentModel = this.model.components.find(comp => comp.parentId === matchSlotModel.id)
      validate(matchComponentModel)

      const matchOrganismModel = this.model.organisms.find(organism => organism.parentId === matchComponentModel.id)
      const matchMoleculeModel = this.model.molecules.find(molecule => molecule.parentId === matchComponentModel.id)
      const matchAtomModel = this.model.atoms.find(atom => atom.parentId === matchComponentModel.id)

      if (matchOrganismModel !== undefined) {
        slot.slot = matchOrganismModel.value;
        slot.component = await createComponent("organisms", matchOrganismModel.value)

        if(slot.component){
          if (slot.component.organisms) {
              processOrganisms(this.model, slot.component, matchOrganismModel)
        }

        if (slot.component.molecules) {
            for (const [index, subCompMolecule] of slot.component.molecules.entries()) {
              const subSubSubComp = subCompMolecule.component
              const subSubSubCompModels = this.model.molecules.filter(mol => mol.parentId ===  matchOrganismModel.id)
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

        if (slot.component.functions){
          await processFunction(this.model, slot.component, matchOrganismModel)
        }
      }

    if (matchMoleculeModel !== undefined){
      slot.slot = matchMoleculeModel.value;
      slot.component = await createComponent("molecules", matchMoleculeModel.value)
      if(slot.component){
        if (slot.component.atoms) {
          processAtoms(this.model, slot.component, [matchMoleculeModel])
        }
      }
    }

    if (matchAtomModel !== undefined){
      slot.slot = matchAtomModel.value;
      slot.component = await createComponent("atoms", matchAtomModel.value)
      if(slot.component){
        assignAtomValue(this.model.atomValues, slot.component, [matchAtomModel], 0)
        }
      }
    }
      return this.viewTemplate.slots;
  };

  this.addBindScriptToViewTemplate = async () => {
    const component = this.viewTemplate;
        component.bindScript = async function() {
        for await (const slot of component.slots) {
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
  const action = await importModuleFromFile(pathToAction, file)
  return action[file];
}

const processFunction  = async (model, component, componentModel) => {
  const functionModels = model.functions.filter(func => func.parentId === componentModel.id);

  for (const func of functionModels) {
    const funcId = func.key.split(" ")[1]
    const compFunc = component.functions.find(aFunc => aFunc.id == funcId)
    compFunc.function = func.value
    compFunc.functionCall = await createAction(func.value)
    compFunc.parameters = func.parameters;
  }
}

  const processOrganisms = async (model, comp, matchOrganismModel) => {
    for (const [index, subCompOrganism] of comp.organisms.entries()) {
      const subSubComp = subCompOrganism.component
      const subSubCompModels = model.organisms.filter(org => org.parentId === matchOrganismModel.id)

      if (subSubComp.functions) processFunction(this.model, subSubComp, subSubCompModels[index])
      if (subSubComp.molecules) await processMolecules(this.model, subSubComp, subSubCompModels);

    }
  };
const processMolecules = async (model, subSubComp, subSubCompModels) => {
  for (const [index, molecule] of subSubComp.molecules.entries()) {
    const moleculeComponent = molecule.component;
    const matchMoleculeModels = model.molecules.filter(mol => mol.parentId === subSubCompModels[index].id);
    if (moleculeComponent.functions) processFunction(model, moleculeComponent,subSubCompModels[index])
    if (moleculeComponent.atoms) await processAtoms(model, moleculeComponent, matchMoleculeModels);
  }
};


const processAtoms = async (model, moleculeComponent, matchMoleculeModels) => {
  for (const [index, atom] of moleculeComponent.atoms.entries()) {
    const atomComponent = atom.component;
    const matchAtomModels = model.atoms.filter(at => at.parentId === matchMoleculeModels[0].id);

    assignAtomValue(model.atomValues, atomComponent, matchAtomModels, index)
  }
};

function assignAtomValue(atomValuesModel, atomComp, matchAtomModels, index) {
  if (atomComp.value) {
    const matchedAtomValue = atomValuesModel.find(at => at.parentId === matchAtomModels[index].id);
    atomComp.value = [{ value: matchedAtomValue.value }];
  }
}

function validate(obj) {
  if (!obj) {
    throw new Error(`Object not found`);
  }
}