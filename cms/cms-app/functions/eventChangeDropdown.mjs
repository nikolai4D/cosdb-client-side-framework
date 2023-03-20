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
  const key = select.getAttribute("key");
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  const data = {};
  data.id = id;
  data.parentId = parentId;
  data.value = value;
  data.key = key;
  data.customType = customType;
  data.updated = Date();

  if (customType === "viewTemplate") {
    const viewTemplateBody = await getAccordionBody(id);

    const state = await mutation_updateState("viewTemplates", data, true);

    if (value !== "") {
      await createSlots(viewTemplateBody, id, value);
    }

    await action_writeModel(state);
  }

  if (customType === "function") {
    const state = await mutation_updateState("functions", data, true);

    await action_writeModel(state);
  }

  if (customType === "component") {
    const componentBody = await getAccordionBody(id);

    const state = await mutation_updateState("components", data, true);

    if (value !== "") {
      if (value.startsWith("Organism")) {
        await createOrganism(componentBody, id, value);
      }
      if (value.startsWith("Molecule")) {
        await createMolecule(componentBody, id, value);
      }
      if (value.startsWith("Atom")) {
        await createAtom(componentBody, id, value);
      }
    }

    await action_writeModel(state);
  }
}
