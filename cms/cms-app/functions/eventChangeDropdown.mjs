// import { readModel } from "../requests/readModel.mjs";
// import { updateField } from "../functions/updateField.mjs";
// import { writeModel } from "../requests/writeModel.mjs";

import { createOrganism } from "../_5_organism/createOrganism.mjs";
import { createMolecule } from "../_6_molecule/createMolecule.mjs";
import { createAtom } from "../_7_atom/createAtom.mjs";

import { createSlots } from "../_3_slot/createSlots.mjs";
import { State, action } from "../State.mjs";

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
  
  getDomAndData(customType, id, selectedValue, parentId)

}
  const getDomAndData = async (customType, id, selectedValue, parentId) => {
     await getByCustomType(customType, id, selectedValue, parentId);
     console.log({State})
     action.updateModel(await State)
    // do something else here after firstFunction completes
  }

async function getByCustomType(customType, id, selectedValue, parentId) {
  if (customType === "viewTemplate") {
    const viewTemplateBody = await getAccordionBody(id);

    if (selectedValue !== "") {
      await createSlots(viewTemplateBody, id, selectedValue);
      await action.create(id, selectedValue, parentId, "viewTemplates");
    }
  }
  if (customType === "component") {
    const componentBody = await getAccordionBody(id);

    if (selectedValue !== "") {
      if (selectedValue.startsWith("Organism")) {
        console.log("Organism");
        await createOrganism(componentBody, id, selectedValue);
        await action.create(id, selectedValue, parentId, "organisms");

      }
      if (selectedValue.startsWith("Molecule")) {
        console.log("Molecule");
        await createMolecule(componentBody, id, selectedValue);
        await action.create(id, selectedValue, parentId, "molecules");
      }
      if (selectedValue.startsWith("Atom")) {
        console.log("Atom");
        await createAtom(componentBody, id, selectedValue);
        await action.create(id, selectedValue, parentId, "atoms");
      }
    }
  }
}

function getAccordionBody(id) {
  const accordionBody = document.getElementById("accordion-body-" + id);
  while (accordionBody.firstChild) {
    accordionBody.removeChild(accordionBody.firstChild);
  }
  return accordionBody;
}
