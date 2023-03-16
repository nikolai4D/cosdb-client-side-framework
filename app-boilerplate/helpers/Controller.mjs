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
    const path = window.location.pathname.slice(1);
    const view = this.model.views.find(view => view.value === path);
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    const file = viewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);

    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id);

    return new viewTemplateComponent[file]();
  };

  this.getComponents = async () => {};
  this.getSlots = async () => {
    const component = this.childComponent;

    const createComponent = async (file, folder) => {
      const pathToComponent = `../../components/${folder}/${file}.mjs`;
      const componentModule = await importModuleFromFile(pathToComponent, file);
      return new componentModule[file]();
    };

    const processSlots = async (slot, parentId) => {
      const { organisms, molecules, atoms, atomValues } = this.model;
    
      const findModelById = (models, id) => models.find(model => model.parentId === id);
    
      const processSubComponents = async (component, subComponents, models) => {
        for (const [index, subComponent] of subComponents.entries()) {
          const subComponentModel = findModelById(models, subComponent.parentId);
          if (subComponentModel) {
            const newComponent = await createComponent(subComponentModel.value, subComponent.folder);
            subComponent.component = newComponent;
            await processSlots(subComponent, subComponentModel.id);
          }
        }
      };
    
      const organismModel = findModelById(organisms, parentId);
      const moleculeModel = findModelById(molecules, parentId);
      const atomModel = findModelById(atoms, parentId);
    
      if (organismModel) {
        slot.slot = organismModel.value;
        slot.component = await createComponent(organismModel.value, 'organisms');
        await processSubComponents(slot.component, slot.component.organisms, organisms);
        await processSubComponents(slot.component, slot.component.molecules, molecules);
        await processSubComponents(slot.component, slot.component.atoms, atoms);
      } else if (moleculeModel) {
        slot.slot = moleculeModel.value;
        slot.component = await createComponent(moleculeModel.value, 'molecules');
        await processSubComponents(slot.component, slot.component.atoms, atoms);
      } else if (atomModel) {
        slot.slot = atomModel.value;
        slot.component = await createComponent(atomModel.value, 'atoms');
        const atomValueModel = findModelById(atomValues, parentId);
        if (atomValueModel) {
          slot.component.value = [{ value: atomValueModel.value }];
        }
      }
    };
    

    for (const slot of component.slots) {
      const specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot);
      if (specificSlot) {
        await processSlots(slot, specificSlot.id);
      }
    }
  };

  this.bindNewScripts = async () => {
    const component = this.childComponent;

    component.bindScript = async function() {
      for (const slot of component.slots) {
        if (slot.component) {
          await component.fillSlot(slot.slot, slot.component.getElement());
        }
      }
    };
  };

  this.template = async () => {
    this.childComponent = await this.getComponent();
    await this.getSlots();
    await this.bindNewScripts();

    this.childComponent.model = this.model;

    return this.childComponent;
  };
}
