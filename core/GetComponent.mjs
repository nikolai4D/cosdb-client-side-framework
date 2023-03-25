import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

import { createComp } from "./helpers.mjs";

export async function GetComponent(compName, compParentId) {
  let type;
  console.log(compName, "compName", compParentId, "compParentId");

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

    const component = compAndData.component;
    console.log(component, "component before asigning data");
    const data = compAndData.data;
    component.value = [{ value: data[0].atomValue }];
    console.log(component, "component after asigning data");
  }
  console.log(component, "component");

  const renderComponent = await component.render();
  console.log(renderComponent, "renderComponent");

  const renderComponentArray = Array.from(renderComponent);

  for (const child of renderComponentArray) {
    div.appendChild(child);
  }

  return div;
}

async function createComponent(type, file, compParentId) {
  //get the module
  const component = await createComp(type, file);
  //get data from model
  const data = await apiCallGet(`/read/${type}s/${compParentId}`);
  if (type === "atom") {
    const atomValueId = data[0].id;
    const atomValeData = await apiCallGet(`/read/atomValues/${atomValueId}`);
    data[0].atomValue = atomValeData[0].value;
  }

  return { component, data };
}
