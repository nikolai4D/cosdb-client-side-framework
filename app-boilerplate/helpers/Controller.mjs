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

    console.log(this.model, "this.model")
    // getting the view title from the url to get the view from model
    const path = window.location.pathname.slice(1)

    console.log(path, "path")

    // getting the view from the model to get the id
    const view = this.model.views.find(view => view.value === path)
    // getting the viewTemplate from the model with the view id as parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id)
    // getting the name of the viewTemplate
    const file = viewTemplate.value;
    // getting the path to the viewTemplate prototype
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`
    // importing the viewTemplate prototype

    console.log("hello")
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file)
    console.log("hello22")

    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id)

    let component = new viewTemplateComponent[file]();


    return component

  }

  this.getSlots = async () => {
    let component = this.childComponent

    for (let slot of component.slots) {
      // component.slots.forEach(async slot => {

        let specificSlot =  this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)
        console.log(specificSlot, "specificSlot")
        if (specificSlot) {
          let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)

          console.log(this.model, "this.model")

          console.log(specificComponent, "specificComponent")


          if (specificComponent) {

            const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)

            console.log(organismModel, "organismModel")

            if (organismModel) {
              slot.slot = organismModel.value; 

              const fileOrganism = organismModel.value;
              const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
              const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
              let organism =  new organismComponent[fileOrganism]();

              slot.component =  organism
            }
          }
        }
      }
  };

  this.bindNewScripts =  () => {
    let component =  this.childComponent;

         component.bindScript=  function() {

          console.log(component.slots, "slots")
          for (let slot of component.slots) {
            console.log( slot, "slot")
            if (slot.component)
            component.fillSlot(slot.slot,  slot.component.getElement())
          // await component.slots.forEach( async slot => {

        }
      }
    };


  this.template = async () => {
    this.childComponent = await this.getComponent();
    await this.getSlots();
    await this.bindNewScripts();


    console.log(await this.childComponent)

    return await this.childComponent ;

  }

}


// TODO: 

// step 1

// get model with views
// get path of view via url
// route to that view (path is a variable, view is dynamic)
// get viewTemplate from model.json with view as parentId
// this.template = new viewTemplate();


// step 2

// get subcomponents from model.json with viewTemplate as parentId
// for each subcomponent, get the component from model.json with subcomponent as parentId
// render that component somehow...





// for each view, create a route with controller
// in that controller, get the viewTemplate from model.json with view as parentId
// 




// import { View } from "cosdb-client-framework/core/View.mjs";

// export function Controller({title, view, viewTemplate, slots}) {
//   View.call(this);

//   this.title = title;
// //   const view = view;

//   //model
// //   ListAllInformation_Model(view);

//   //view
//   this.template = new viewTemplate();
//   this.template.slots = slots
// }

