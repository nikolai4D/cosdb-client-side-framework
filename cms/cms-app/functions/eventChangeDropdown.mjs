import { createOrganism } from "../_5_organism/createOrganism.mjs";
import { createMolecule } from "../_6_molecule/createMolecule.mjs";
import { createAtom } from "../_7_atom/createAtom.mjs";

import { createSlots } from "../_3_slot/createSlots.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function eventChangeDropdown(id) {
  const select = document.getElementById(id);
  const selectedValue = select.value;
  const customType = select.getAttribute("customType");
  const parentId = select.getAttribute("parentId");

  console.log("update: ", customType, ": ", {
    id,
    parentId,
    selectedValue,
  });

  if (customType === "viewTemplate") {
    const viewTemplateBody = await getAccordionBody(id);

    if (selectedValue !== "") {
      await createSlots(viewTemplateBody, id, selectedValue);
      //await action.create(id, selectedValue, parentId, "viewTemplates");
    }
  }
  if (customType === "component") {
    const componentBody = await getAccordionBody(id);

    if (selectedValue !== "") {
      if (selectedValue.startsWith("Organism")) {
        console.log("Organism");

        await createOrganism(componentBody, id, selectedValue);
        //await action.create(id, selectedValue, parentId, "organisms");
      }
      if (selectedValue.startsWith("Molecule")) {
        console.log("Molecule");
        await createMolecule(componentBody, id, selectedValue);
        //await action.create(id, selectedValue, parentId, "molecules");
      }
      if (selectedValue.startsWith("Atom")) {
        console.log("Atom");
        await createAtom(componentBody, id, selectedValue);
        //await action.create(id, selectedValue, parentId, "atoms");
      }
    }
    console.log({ State });
    //action.updateModel(await State);
  }
}

function getAccordionBody(id) {
  const accordionBody = document.getElementById("accordion-body-" + id);
  while (accordionBody.firstChild) {
    accordionBody.removeChild(accordionBody.firstChild);
  }
  return accordionBody;
}
