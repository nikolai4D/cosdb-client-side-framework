

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

        // Filter the slots based on the viewTemplate's ID
      const slotModels = this.model.slots.filter(slot => slot.parentId === this.viewTemplate.id);

      // get the slot from the model
        let specificSlot =  slotModels.find(slotModel => slotModel.value === slot.slot)

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
  const action = await importModuleFromFile(pathToAction, file)
  return action[file];
}

const processFunction  = async (model, component, componentModel) => {
  let functionModels = model.functions.filter(func => func.parentId === componentModel.id);

  for (let func of functionModels) {
    let funcId = func.key.split(" ")[1]
    let compFunc = component.functions.find(aFunc => aFunc.id == funcId)
    compFunc.function = func.value
    compFunc.functionCall = await createAction(func.value)
    compFunc.parameters = func.parameters;
  }
}

  const processOrganisms = async (model, comp, organismModel) => {
    for (let [index, subCompOrganism] of comp.organisms.entries()) {
      let subSubComp = subCompOrganism.component
      let subSubCompModels = model.organisms.filter(org => org.parentId === organismModel.id)

      if (subSubComp.functions) processFunction(this.model, subSubComp, subSubCompModels[index])
      if (subSubComp.molecules) await processMolecules(this.model, subSubComp, subSubCompModels);

    }
  };
const processMolecules = async (model, subSubComp, subSubCompModels) => {
  for (let [index, molecule] of subSubComp.molecules.entries()) {
    let moleculeComponent = molecule.component;
    let moleculeModels = model.molecules.filter(mol => mol.parentId === subSubCompModels[0].id);
    if (moleculeComponent.functions) processFunction(model, moleculeComponent,subSubCompModels[index])
    if (moleculeComponent.atoms) await processAtoms(model, moleculeComponent, moleculeModels);
  }
};


const processAtoms = async (model, moleculeComponent, moleculeModels) => {
  for (let [index, atom] of moleculeComponent.atoms.entries()) {
    let atomComponent = atom.component;
    let atomModels = model.atoms.filter(at => at.parentId === moleculeModels[0].id);

    assignAtomValue(model.atomValues, atomComponent, atomModels, index)
  }
};

function assignAtomValue(atomValuesModel, atomComp, atomModels, index) {
  if (atomComp.value) {
    let matchedAtomValue = atomValuesModel.find(at => at.parentId === atomModels[index].id);
    atomComp.value = [{ value: matchedAtomValue.value }];
  }
}