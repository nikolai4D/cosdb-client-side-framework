

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
    throwErrorIfUndefined(view)
    // Find the viewTemplate in the model using the view's ID as the parentId
    const foundModelViewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    throwErrorIfUndefined(foundModelViewTemplate)
  
    // Get the name and path of the viewTemplate component file
    const file = foundModelViewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;
  
    // Import the viewTemplate component
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);
    throwErrorIfUndefined(viewTemplateComponent)
  
    // Instantiate the component
    const viewTemplateComp = new viewTemplateComponent[file]();

    viewTemplateComp.id = foundModelViewTemplate.id;

    return viewTemplateComp;
  
  };


  this.addComponentsInTemplateSlotConstructors = async () => {
    const foundModelSlotsForViewTemplate = model.slots.filter(slot => slot.parentId === viewTemplate.id);
    const foundComponentSlotsForViewTemplate = viewTemplate.slots;
  
    for (const slotComp of foundComponentSlotsForViewTemplate) {
      const foundModelSlot = foundModelSlotsForViewTemplate.find(slotModel => slotModel.value === slotComp.slot);
      validate(foundModelSlot);
  
      const foundModelComponent = model.components.find(comp => comp.parentId === foundModelSlot.id);
      validate(foundModelComponent);
  
      const foundModelAtom = model.atoms.find(atom => atom.parentId === foundModelComponent.id);
      if (foundModelAtom !== undefined) {
        await addAtomComponent(slotComp, foundModelAtom);
        continue;
      }
  
      const foundModelMolecule = model.molecules.find(molecule => molecule.parentId === foundModelComponent.id);
      if (foundModelMolecule !== undefined) {
        await addMoleculeComponent(slotComp, foundModelMolecule);
        continue;
      }
  
      const foundModelOrganism = model.organisms.find(organism => organism.parentId === foundModelComponent.id);
      if (foundModelOrganism !== undefined) {
        await addOrganismComponent(slotComp, foundModelOrganism);
        continue;
      }
    }
    return foundComponentSlotsForViewTemplate;
  };

  


  // this.addComponentsInTemplateSlotConstructors = async () => {
  //   const foundModelSlotsForViewTemplate = this.model.slots.filter(slot => slot.parentId === this.viewTemplate.id);
  //   const foundComponentSlotsForViewTemplate = this.viewTemplate.slots;
    
  //   for (const slotComp of foundComponentSlotsForViewTemplate) {

  //     const foundModelSlot =  foundModelSlotsForViewTemplate.find(slotModel => slotModel.value === slotComp.slot)
  //     throwErrorIfUndefined(foundModelSlot)

  //     const foundModelComponent = this.model.components.find(comp => comp.parentId === foundModelSlot.id)
  //     throwErrorIfUndefined(foundModelComponent)

  //     const foundModelAtom = this.model.atoms.find(atom => atom.parentId === foundModelComponent.id)
  //     const foundModelMolecule = this.model.molecules.find(molecule => molecule.parentId === foundModelComponent.id)
  //     const foundModelOrganism = this.model.organisms.find(organism => organism.parentId === foundModelComponent.id)

  //     if (foundModelAtom !== undefined){
  //       slotComp.slot = foundModelAtom.value;
  //       slotComp.component = await createComponent("atoms", foundModelAtom.value)
  //       if(slotComp.component){
  //         assignAtomValue(this.model.atomValues, slotComp.component, [foundModelAtom], 0)
  //         }
  //       }

  //     if (foundModelMolecule !== undefined){
  //       slotComp.slot = foundModelMolecule.value;
  //       slotComp.component = await createComponent("molecules", foundModelMolecule.value)

  //       if (slotComp.component.atoms) {
  //           processAtoms(this.model, slotComp.component, [foundModelMolecule])
  //       }
  //     }

  //     if (foundModelOrganism !== undefined) {
  //       slotComp.slot = foundModelOrganism.value;
  //       slotComp.component = await createComponent("organisms", foundModelOrganism.value)

  //       if (slotComp.component.organisms) {
  //           processOrganisms(this.model, slotComp.component, foundModelOrganism)
  //       }

  //       if (slotComp.component.molecules) {
  //         processMolecules(this.model, slotComp.component,[foundModelOrganism])
  //       }

  //       if (slotComp.component.atoms) {
  //         processAtoms(this.model, slotComp.component, foundModelSlotsForViewTemplate)
  //         }

  //       if (slotComp.component.functions){
  //         await processFunction(this.model, slotComp.component, foundModelOrganism)
  //       }
  //     }
  //   }
  //     return foundComponentSlotsForViewTemplate;
  // };


  
  this.addBindScriptToViewTemplate = async () => {
    this.viewTemplate.bindScript = async function() {
        for await (const slotComp of this.slots) {
          if (await slotComp.component)
            await this.fillSlot(slotComp.slot, slotComp.component.getElement())
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
  const foundModelFunctions = model.functions.filter(func => func.parentId === componentModel.id);

  for (const func of foundModelFunctions) {
    const funcId = func.key.split(" ")[1]
    const compFunc = component.functions.find(aFunc => aFunc.id == funcId)
    compFunc.function = func.value
    compFunc.functionCall = await createAction(func.value)
    compFunc.parameters = func.parameters;
  }
}

const processOrganisms = async (model, comp, foundModelParent) => {
  for (const [index, organism] of comp.organisms.entries()) {
    const organismComponent = organism.component
    const foundModelOrganisms = model.organisms.filter(org => org.parentId === foundModelParent.id)

    if (organismComponent.functions) processFunction(this.model, organismComponent, foundModelOrganisms[index])
    if (organismComponent.molecules) await processMolecules(this.model, organismComponent, foundModelOrganisms);

  }
};

const processMolecules = async (model, comp, foundModelParent) => {
  for (const [index, molecule] of comp.molecules.entries()) {
    const moleculeComponent = molecule.component;
    let parent = foundModelParent[0]
    if (foundModelParent.length > 1) {
      parent =  foundModelParent[index]
    }
    const foundModelMolecules = model.molecules.filter(mol => mol.parentId === parent.id);
    if (moleculeComponent.functions) processFunction(model, moleculeComponent, parent)
    if (moleculeComponent.atoms) await processAtoms(model, moleculeComponent, [foundModelMolecules[index]]);
  }
};

const processAtoms = async (model, moleculeComponent, foundModelMolecules) => {
  for (const [index, atom] of moleculeComponent.atoms.entries()) {
    const atomComponent = atom.component;
    const foundModelAtoms = model.atoms.filter(at => at.parentId === foundModelMolecules[0].id);

    assignAtomValue(model.atomValues, atomComponent, foundModelAtoms, index)
  }
};

function assignAtomValue(atomValuesModel, atomComp, foundModelAtoms, index) {
  if (atomComp.value) {
    const matchedAtomValue = atomValuesModel.find(at => at.parentId === foundModelAtoms[index].id);
    atomComp.value = [{ value: matchedAtomValue.value }];
  }
}

function throwErrorIfUndefined(obj) {
  if (!obj) {
    throw new Error(`Object not found`);
  }
}

const addAtomComponent = async (slotComp, foundModelAtom) => {
  slotComp.slot = foundModelAtom.value;
  slotComp.component = await createComponent("atoms", foundModelAtom.value);
  if (slotComp.component) {
    assignAtomValue(model.atomValues, slotComp.component, [foundModelAtom], 0);
  }
}

const addMoleculeComponent = async (slotComp, foundModelMolecule) => {
  slotComp.slot = foundModelMolecule.value;
  slotComp.component = await createComponent("molecules", foundModelMolecule.value);
  if (slotComp.component.atoms) {
    processAtoms(model, slotComp.component, [foundModelMolecule]);
  }
}

const addOrganismComponent = async (slotComp, foundModelOrganism) => {
  slotComp.slot = foundModelOrganism.value;
  slotComp.component = await createComponent("organisms", foundModelOrganism.value);
  if (slotComp.component.organisms) {
    processOrganisms(model, slotComp.component, foundModelOrganism);
  }
  if (slotComp.component.molecules) {
    processMolecules(model, slotComp.component, [foundModelOrganism]);
  }
  if (slotComp.component.atoms) {
    processAtoms(model, slotComp.component, foundModelSlotsForViewTemplate);
  }
  if (slotComp.component.functions) {
    await processFunction(model, slotComp.component, foundModelOrganism);
  }
}
