

import { View } from "../../core/View.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";
import { throwErrorIfUndefined, addAtomComponent, addMoleculeComponent, addOrganismComponent} from "./controllerHelpers.mjs";


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
    const foundModelSlotsForViewTemplate = this.model.slots.filter(slot => slot.parentId === this.viewTemplate.id);
    const foundComponentSlotsForViewTemplate = this.viewTemplate.slots;
  
    for (const slotComp of foundComponentSlotsForViewTemplate) {
      const foundModelSlot = foundModelSlotsForViewTemplate.find(slotModel => slotModel.value === slotComp.slot);
      throwErrorIfUndefined(foundModelSlot);
  
      const foundModelComponent = this.model.components.find(comp => comp.parentId === foundModelSlot.id);
      throwErrorIfUndefined(foundModelComponent);
  
      const foundModelAtom = this.model.atoms.find(atom => atom.parentId === foundModelComponent.id);
      if (foundModelAtom !== undefined) {
        await addAtomComponent(slotComp, foundModelAtom, this.model);
        continue;
      }
  
      const foundModelMolecule = this.model.molecules.find(molecule => molecule.parentId === foundModelComponent.id);
      if (foundModelMolecule !== undefined) {
        await addMoleculeComponent(slotComp, foundModelMolecule, this.model);
        continue;
      }
  
      const foundModelOrganism = this.model.organisms.find(organism => organism.parentId === foundModelComponent.id);
      if (foundModelOrganism !== undefined) {
        await addOrganismComponent(slotComp, foundModelOrganism, this.model);
        continue;
      }
    }
    return foundComponentSlotsForViewTemplate;
  };

  this.template = async () => {
    this.viewTemplate = await this.getViewTemplate();
    this.viewTemplate.slots = await this.addComponentsInTemplateSlotConstructors();
    this.viewTemplate.bindScript = async function() {
      for await (const slotComp of this.slots) {
        if (await slotComp.component)
          await this.fillSlot(slotComp.slot, slotComp.component.getElement())
        }
    }

    return this.viewTemplate ;
  }
}



