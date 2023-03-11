import { createMolecule } from "../_6_molecule/createMolecule.mjs";
import { createOrganism } from "../_5_organism/createOrganism.mjs";
import { createAtom } from "../_7_atom/createAtom.mjs";
import { getAccordionBody } from "../functions/getAccordionBody.mjs";
import { createSlots } from "../_3_slot/createSlots.mjs";

import { action_writeModel } from "../data-mgmt/actions/action_writeModel.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function eventChangeDropdown(id) {
  const select = document.getElementById(id);
  const selectedValue = select.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  const data = {};
  data.id = id;
  data.parentId = parentId;
  data.value = selectedValue;
  data.key = customType;

  console.log("update: ", customType, ": ", {
    id,
    parentId,
    selectedValue,
  });

  if (customType === "viewTemplate") {
    const viewTemplateBody = await getAccordionBody(id);

    const state = await mutation_updateState("viewTemplates", data);

    if (selectedValue !== "") {
      await createSlots(viewTemplateBody, id, selectedValue);
    }

    await action_writeModel(state);
    console.log("updated viewTemplate dropdown with state: ", state);
  }
  if (customType === "component") {
    const componentBody = await getAccordionBody(id);

    if (selectedValue !== "") {
      if (selectedValue.startsWith("Organism")) {
        console.log("Organism");
        await createOrganism(componentBody, id, selectedValue);
      }
      if (selectedValue.startsWith("Molecule")) {
        console.log("Molecule");
        await createMolecule(componentBody, id, selectedValue);
      }
      if (selectedValue.startsWith("Atom")) {
        console.log("Atom");
        await createAtom(componentBody, id, selectedValue);
      }
    }
    const state = await mutation_updateState("components", data);

    await action_writeModel(state);
    console.log("updated component dropdown with state: ", state);
  }
}
