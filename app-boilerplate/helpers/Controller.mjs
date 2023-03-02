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

import { View } from "cosdb-client-framework/core/View.mjs";
import { ViewTemplate_dummy1 } from "cosdb-client-framework/components/viewTemplates/ViewTemplate_dummy1.mjs";


export function Controller() {
  View.call(this);

  this.title = title;
//   const view = view;

  //model
//   ListAllInformation_Model(view);

  //view
  this.template = new ViewTemplate_dummy1();
  // this.template.slots = slots
}
