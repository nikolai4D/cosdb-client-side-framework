import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
import { ViewTemplate_dummy2 } from "../../components/viewTemplates/ViewTemplate_dummy2.mjs";
import { State } from "../State.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";


export function Controller() {
  View.call(this);

  this.title = "view1";

  this.template = async function(){

    const data = await readModel();

    const path = window.location.pathname.slice(1)

  const view = data.views.find(view => view.value === path)
     
  const viewTemplate = data.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id)

  console.log(data, viewTemplate)
  const file = viewTemplate.value;
  const pathToComponent = `../../components/viewTemplates/${file}.mjs`
  const viewTemplateComponent = await importModuleFromFile(pathToComponent, file)

  console.log(viewTemplateComponent, "viewTemplateComponent")
  console.log(new viewTemplateComponent[`${file}.mjs`](), "viewTemplateComponent")


    return new viewTemplateComponent[`${file}.mjs`]();
  }



}




// export async function test() {
//   console.log(await State, "State")
//     const view = (await State).model.views.find(view => view.value === path)
//   console.log(view, "view")

//   return new ViewTemplate_dummy1();
// }




//   const view = view;

  //model
//   ListAllInformation_Model(view);

  //view

// this.template = new ViewTemplate_dummy1();
  // this.template = function () {
  //   const view = await State.model.views.find(view => view.value === path)
  // console.log(view, "view")

  // this.template = new ViewTemplate_dummy1();

  // console.log("test",test);

// }

  //   const path = window.location.pathname.slice(1)

  // console.log(path, "path")
  // console.log("Statess!: ", State)

  // const view = await State.model.views.find(view => view.value === path)
  // console.log(view, "view")

  // const viewTemplate = State.model.viewTemplates.find(viewTemplate => viewTemplate.parent === view.parentId)

  // const file = viewTemplate.value;
  // const pathToComponent = `../../components/viewTemplates/${file}.mjs`
  // const viewTemplateComponent = importModuleFromFile(pathToComponent, file)

  // console.log(viewTemplateComponent, "viewTemplateComponent")
  // }

    //     return `

// ${this.template}

  // this.template = new viewTemplateComponent();

  //  console.log(  readModel())
  // console.log(this.template.slots)
  // console.log(model, "model")
  // this.template.slots = slots



// export

// export async function readModel() {
//   try {
//     const response = await fetch("/read");
//     // console.log(response);

//     const data = await response.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.error("An error occurred while fetching the data:", error);
//   }
// }

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

