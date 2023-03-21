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
import { newFunction } from "../_8_function/newFunction.mjs";
import { input } from "../types/input.mjs";

import { getConstructors } from "../functions/getConstructors.mjs";

export async function readExistingModel() {
  const readModel = await action_readModel();

  // add views from state

  for (const view of State.views) {
    // add viewTemplates from state

    const existingViewTemplate = State.viewTemplates.find(
      (viewTemplate) => viewTemplate.parentId === view.id
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

      const componentBody = await getAccordionBody(componentId);

      // add organisms from state
      await createOrganism(componentId, componentBody);

      // add molecules from state
      await createMolecule(componentId, componentBody);

      // add atoms from state
      await createAtom(componentId, componentBody);
    }
  }
}

async function createOrganism(componentId, componentBody) {
  const existingOrganism = State.organisms.filter(
    (organism) => organism.parentId === componentId
  );

  if (existingOrganism) {
    for (const organism of existingOrganism) {
      const organismBody = document.createElement("div");
      const organismDiv = await Organism(organism, organismBody);
      componentBody.appendChild(organismDiv);
      await createOrganism(organism.id, organismBody);
      await createMolecule(organism.id, organismBody);

      // add functions from state

      await getComponentFunctions(
        organism.value,
        organism.id,
        "organisms",
        null,
        organismBody
      );
    }
  }
}

async function createMolecule(componentId, componentBody) {
  const existingMolecule = State.molecules.filter(
    (molecule) => molecule.parentId === componentId
  );

  if (existingMolecule) {
    for (const molecule of existingMolecule) {
      const moleculeBody = document.createElement("div");
      const moleculeDiv = await Molecule(molecule, moleculeBody);
      componentBody.appendChild(moleculeDiv);

      await createAtom(molecule.id, moleculeBody);

      // add functions from state

      await getComponentFunctions(
        molecule.value,
        molecule.id,
        "molecules",
        null,
        moleculeBody
      );
    }
  }
}

async function createAtom(moleculeId, moleculeBody) {
  const existingAtoms = State.atoms.filter(
    (atom) => atom.parentId === moleculeId
  );

  if (existingAtoms) {
    for (const existingAtom of existingAtoms) {
      const atomBody = document.createElement("div");
      const atomDiv = await Atom(existingAtom, atomBody);
      moleculeBody.appendChild(atomDiv);

      const atomValue = State.atomValues.find(
        (atomVal) => atomVal.parentId === existingAtom.id
      );

      let atomValueDiv = await input(
        atomValue.customType,
        atomValue.key,
        atomValue.value,
        atomValue.id,
        atomValue.parentId,
        atomValue.valueDisabled
      );
      atomBody.appendChild(atomValueDiv);
    }
  }
}

async function getComponentFunctions(
  component,
  id,
  componentType,
  body,
  parentBody
) {
  // get Functions

  const constructorTypeFunctions = "functions";

  const componentFunctions = await getConstructors(
    component,
    constructorTypeFunctions,
    componentType
  );

  if (componentFunctions) {
    await createFunctionsEl(componentFunctions, id, body, parentBody);
  }
}

async function createFunctionsEl(componentFunctions, id, body, parentBody) {
  for (const compFn of componentFunctions) {
    const key = "function " + compFn.id;
    const value = compFn.function;
    const parentId = id;

    let functionSlot;

    const existingFn = State.functions.find(
      (fn) => fn.parentId === parentId && fn.key === key
    );

    if (existingFn) {
      console.log("existingFn.parameters", existingFn.parameters);
      if (typeof existingFn.parameters === "object") {
        existingFn.parameters = JSON.stringify(existingFn.parameters);
      }
      functionSlot = await Function(existingFn, body);
    } else {
      functionSlot = await Function(await newFunction(parentId, key), body);
    }

    parentBody.insertBefore(functionSlot, parentBody.firstChild);
  }
}
