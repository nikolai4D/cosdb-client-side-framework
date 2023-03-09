import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
import { ViewTemplate_dummy2 } from "../../components/viewTemplates/ViewTemplate_dummy2.mjs";
import { State } from "../State.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";


export function Controller() {
  View.call(this);

  this.title = "view1";

  this.childComponent = null;

  this.slotsFromModel = null;

  this.model = null;

  this.getComponent = async function() { 

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

  this.getSlots = async function() {
    let component = this.childComponent

      component.slots.forEach(async slot => {

        let specificSlot = this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)

        if (specificSlot) { 
          const organismModel = this.model.organisms.find(organism => organism.parentId === specificSlot.id)


          if (organismModel) {
            slot.slot = organismModel.value;

            const fileOrganism = organismModel.value;
            const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`
            const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
            let organism = await new organismComponent[fileOrganism]();

            slot.component = organism
          }
        }
      })
  };

  this.bindNewScripts = async function() {
    let component = this.childComponent;

    component.bindScript= function() {
      console.log("hello")
      console.log("component", component)

    }
  };



  this.template = async function(){

  this.childComponent = await this.getComponent();
  await this.getSlots();
  await this.bindNewScripts();


  // component.slots.forEach(async slot => {

  //   console.log(slot, "slot")
  //   let specificSlot = slotsFromModel.find(slotModel => slotModel.value === slot.slot)


  //   if (specificSlot) { 
  //     const organismModel = this.model.organisms.find(organism => organism.parentId === specificSlot.id)


  //     if (organismModel) {
  //       slot.slot = organismModel.value;
  //   //     console.log(slot.slot, "helli")
  //   //     slot.component = "hej"

  //       const fileOrganism = organismModel.value;
  //       const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`
  //       const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
  //   //     console.log(organismComponent, "organism component")
  //       let organism = await new organismComponent[fileOrganism]();

  //       slot.component = organism
  //     }
  //   }
  // }
  // )


  // console.log("thelement")

  // component.bindScript= function() {
  //   console.log("hello")
  //   console.log("component", component)

  // }

  console.log(this.childComponent)

  return this.childComponent ;

  }

}


  // component.slots.forEach(async slot => {

  //   let theSlotInModel = slots.find(slotModel => slotModel.value === slot.slot)


  //   if (theSlotInModel) { 
  //     const organismModel = this.model.organisms.find(organism => organism.parentId === theSlotInModel.id)


  //     if (organismModel) {
  //       slot.slot = organismModel.value;
  //       console.log(slot.slot, "helli")
  //       slot.component = "hej"

  //       const fileOrganism = organismModel.value;
  //       const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`
  //       const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
  //       console.log(organismComponent, "organism component")
  //       let organism = await new organismComponent[fileOrganism]();

  //       slot.component = organism



  //       // slot.appendChild(organism)
  //     }
  //     // const file = organismModel.value;
  //     // const pathToComponent = `../../components/organisms/${file}.mjs`
  //     // const organismComponent = await importModuleFromFile(pathToComponent, file)
  //     // let organism = new organismComponent[file]();
  //     // slot.appendChild(organism)
  //   }
  //   // if (slot.slot === )
  //   // const organismModel = this.model.organisms.find(organism => organism.parentId === slot.id)
  //   // const file = organismModel.value;
  //   // const pathToComponent = `../../components/organisms/${file}.mjs`
  //   // const organismComponent = await importModuleFromFile(pathToComponent, file)
  //   // let organism = new organismComponent[file]();
  //   // slot.appendChild(organism)
  // })


  //   let awaitedSlots =  await this.slots

  //   awaitedSlots.forEach(async el => {
  //     console.log(Object.keys(await el), "el")
  //     console.log(Object.values(await el), "el")

  //   //   this.fillSlot(el.slot, el.component.getElement())
  //   })
  // }


  // getting the subcomponents from the model with the viewTemplate id as parentId

  // getting the components from the model with the subcomponent id as parentId

  // slots.forEach(slot => {
  //   const organism = this.model.organisms.find(organism => organism.parentId === slot.id)
    
  //   }
  // )


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

