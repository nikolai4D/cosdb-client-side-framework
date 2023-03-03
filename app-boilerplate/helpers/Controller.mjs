import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
import { model } from "./model.json";

export function Controller() {
  View.call(this);

  this.title = "view1";
//   const view = view;

  //model
//   ListAllInformation_Model(view);

  //view
  this.template = new ViewTemplate_dummy1();
  console.log(this.template.slots)
  console.log(model, "model")
  // this.template.slots = slots
}

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

