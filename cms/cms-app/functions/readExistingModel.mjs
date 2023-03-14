import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { View } from "../_1_view/View.mjs";
import { State } from "../data-mgmt/State.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";
import { getAccordionBody } from "./getAccordionBody.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();
  //console.log("readExistingModel: readModel:", readModel);

  // add views from state

  for (const view of State.views) {
    // add viewTemplates from state

    const existingViewTemplate = State.viewTemplates.find(
      (viewTemplate) => viewTemplate.parentId === view.id
    );

    console.log(
      "readExistingModel: existingViewTemplate:",
      existingViewTemplate
    );

    const ViewTemplateExistingDiv = await ViewTemplate(existingViewTemplate);

    const viewDiv = await View(view, ViewTemplateExistingDiv);
    document.body.appendChild(viewDiv);

    // add slots form state

    const viewTemplateBody = await getAccordionBody(existingViewTemplate.id);

    const slots = State.components.find(
      (slot) => slot.parentId === existingViewTemplate.id
    );

    console.log("readExistingModel: slots:", slots);
    // const slots = await createSlots(
    //   viewTemplateBody,
    //   existingViewTemplate.id,
    //   existingViewTemplate.value
    // );

    //console.log("readExistingModel: slots:", slots);

    //     for (const slot of slots) {
    //       const existingComponent = State.components.find(
    //         (component) => component.parentId === slot.id
    //       );
    //       console.log("readExistingModel: existingComponent:", existingComponent);
    //       const slotBody = await getAccordionBody(slot.id);
    //       if(existingComponent === undefined) {
    //         const componentDiv = await Component(existingComponent);
    //       } else
    //       const componentDiv = await Component(existingComponent);
    //     }
    //       slotBody.appendChild(componentDiv);
    //     }
  }

  // add components from state

  // add organisms from state
  // add molecules from state
  // add atoms from state
  // add atomValues from state
  // add functions from state
}
