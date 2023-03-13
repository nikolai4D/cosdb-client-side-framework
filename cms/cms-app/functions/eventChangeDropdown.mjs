import { createMolecule } from "../_6_molecule/createMolecule.mjs";
import { createOrganism } from "../_5_organism/createOrganism.mjs";
import { createAtom } from "../_7_atom/createAtom.mjs";
import { getAccordionBody } from "../functions/getAccordionBody.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";

import { action_writeModel } from "../data-mgmt/actions/action_writeModel.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function eventChangeDropdown(id) {
  const select = document.getElementById(id);
  const value = select.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  const data = {};
  data.id = id;
  data.parentId = parentId;
  data.value = value;
  data.key = customType;
  data.customType = customType;

  console.log("update: ", customType, ": ", {
    id,
    parentId,
    value,
  });

  if (customType === "viewTemplate") {
    const viewTemplateBody = await getAccordionBody(id);

    const state = await mutation_updateState("viewTemplates", data, true);

    if (value !== "") {
      await createSlots(viewTemplateBody, id, value);
    }

    await action_writeModel(state);
    console.log("updated viewTemplate dropdown with state: ", state);
  }

  if (customType === "function") {
    const state = await mutation_updateState("functions", data, true);

    await action_writeModel(state);
    console.log("updated function dropdown with state: ", state);
  }

  if (customType === "component") {
    const componentBody = await getAccordionBody(id);

    const state = await mutation_updateState("components", data, true);

    console.log("state before: ", state);

    if (value !== "") {
      if (value.startsWith("Organism")) {
        console.log("Organism");
        await createOrganism(componentBody, id, value);
      }
      if (value.startsWith("Molecule")) {
        console.log("Molecule");
        await createMolecule(componentBody, id, value);
      }
      if (value.startsWith("Atom")) {
        console.log("Atom");
        await createAtom(componentBody, id, value);
      }
    }

    console.log("state after: ", state);

    await action_writeModel(state);
    console.log("updated component dropdown with state: ", state);
  }
}
