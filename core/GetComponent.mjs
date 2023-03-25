import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

import { createComp } from "./helpers.mjs";

export async function GetComponent(compName, compParentId) {
  let type;

  if (compName.startsWith("Organism")) {
    type = "organism";
    //get the module
    const compAndData = await createComponent(type, compName, compParentId);

    //component.organisms = content.organisms;
    //component.molecules = content.molecules;
    //component.functions = content.functions;
  }
  if (compName.startsWith("Molecule")) {
    type = "molecule";

    //component.molecules = content.molecules;
    //component.atoms = content.atoms;
    //component.functions = content.functions;
  }
  if (compName.startsWith("Atom")) {
    type = "atom";
    //get the module
    const compAndData = await createComponent(type, compName, compParentId);
    console.log(compAndData, "compAndData");

    //component.value = content.value;
  }

  //   const renderViewTemplate = await componentObject.render();

  //   const renderViewTemplateArray = Array.from(renderViewTemplate);

  //   for (const child of renderViewTemplateArray) {
  //     div.appendChild(child);
  //   }

  //   return div;
}

async function createComponent(type, file, compParentId) {
  //get the module
  const component = await createComp(type, file);
  //get data from model
  const data = await apiCallGet(`/read/${type}s/${compParentId}`);
  return { component, data };
}
