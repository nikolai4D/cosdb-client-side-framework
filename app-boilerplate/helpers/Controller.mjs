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

  this.getComponent = async () => { 

    this.model = await readModel();

    // getting the view title from the url to get the view from model
    const path = window.location.pathname.slice(1)
    // getting the view from the model to get the id
    const view = this.model.views.find(view => view.value === path)
    // getting the viewTemplate from the model with the view id as parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id)
    // getting the name of the viewTemplate
    const file = viewTemplate.value;
    // getting the path to the viewTemplate prototype
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`
    // importing the viewTemplate prototype

    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file)

    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id)

    let component = new viewTemplateComponent[file]();

    return component

  }

  this.getSlots = async () => {
    let component = this.childComponent

    for (let slot of component.slots) {

        let specificSlot =  this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)
        if (specificSlot) {
          let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)

          if (specificComponent) {

            const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)

            if (organismModel) {
              slot.slot = organismModel.value;

              const fileOrganism = organismModel.value;
              const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
              const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
              let organism =  new organismComponent[fileOrganism](specificComponent.id);

              slot.component =  organism
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

    return await this.childComponent ;

  }

}
