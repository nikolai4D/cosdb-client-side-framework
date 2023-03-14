import { action_readModel } from "../data-mgmt/actions/action_readModel.mjs";
import { View } from "../_1_view/View.mjs";
import { State } from "../data-mgmt/State.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";
import { Slot } from "../_3_slot/Slot.mjs";
import { getAccordionBody } from "./getAccordionBody.mjs";
import { Component } from "../_4_component/Component.mjs";
import { newComponent } from "../_4_component/newComponent.mjs";
import { Organism } from "../_5_organism/Organism.mjs";
import { Molecule } from "../_6_molecule/Molecule.mjs";
import { Atom } from "../_7_atom/Atom.mjs";
import { Function } from "../_8_function/Function.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();
  console.log("readExistingModel: readModel:", readModel);

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

    const slots = State.slots.filter(
      (slot) => slot.parentId === existingViewTemplate.id
    );

    for (const slot of slots) {
      // add components from state
      const existingComponent = State.components.find(
        (component) => component.parentId === slot.id
      );
      let componentDiv;
      let componentId;
      if (existingComponent === undefined) {
        const newComp = await newComponent(slot.id);
        componentId = newComp.id;
        componentDiv = await Component(newComp);
      } else {
        componentDiv = await Component(existingComponent);
        componentId = existingComponent.id;
      }

      const slotDiv = await Slot(slot, componentDiv);
      viewTemplateBody.appendChild(slotDiv);

      // add organisms from state

      const componentBody = await getAccordionBody(componentId);
      console.log("readExistingModel: componentBody:", componentBody);

      await createOrganism(componentId, componentBody);

      // add molecules from state
      // add atoms from state
      // add atomValues from state
      // add functions from state
    }
  }
}

async function createOrganism(componentId, componentBody) {
  const existingOrganism = State.organisms.find(
    (organism) => organism.parentId === componentId
  );

  if (existingOrganism) {
    const organismBody = document.createElement("div");
    const organismDiv = await Organism(existingOrganism, organismBody);
    componentBody.appendChild(organismDiv);
    await createOrganism(existingOrganism.id, organismBody);
    await createMolecule(existingOrganism.id, organismBody);
  }
}

async function createMolecule(componentId, componentBody) {
  const existingMolecule = State.molecules.find(
    (molecule) => molecule.parentId === componentId
  );

  if (existingMolecule) {
    const moleculeBody = document.createElement("div");
    const moleculeDiv = await Molecule(existingMolecule, moleculeBody);
    componentBody.appendChild(moleculeDiv);
    console.log("NEXT ATOMS");
  }
}
