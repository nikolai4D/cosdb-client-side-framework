import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";

export function Controller() {
  View.call(this);

  this.title = "view1";
//   const view = view;

  //model
//   ListAllInformation_Model(view);

  //view
  this.template = new ViewTemplate_dummy1();
   console.log(readModel())
  // console.log(this.template.slots)
  // console.log(model, "model")
  // this.template.slots = slots
}

export async function readModel() {
  try {
    const response = await fetch("/read");
    // console.log(response);

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
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

