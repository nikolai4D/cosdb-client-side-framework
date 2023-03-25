import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

import { createComp } from "./helpers.mjs";

export async function GetComponent(compName, compParentId) {
  let type;
  console.log(compName, "compName", compParentId, "compParentId");

  if (compName.startsWith("Organism")) {
    type = "organism";

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
    try {
      const comp = await createComp(type, compName);
      //get the data
      //const data = await getData(type, compParentId);

      console.log(comp, "comp");
      //console.log(data, "data");

      //comp.value = data[0].atomValue;
    } catch (error) {
      console.log(error, "1");
    }
  }
  try {
    const renderComponent = await comp.render();
    console.log(renderComponent, "renderComponent");
  } catch (error) {
    console.log(error, "1");
  }

  const renderComponentArray = Array.from(renderComponent);

  for (const child of renderComponentArray) {
    div.appendChild(child);
  }

  return div;
}

async function getData(type, parentId) {
  const data = await apiCallGet(`/read/${type}s/${parentId}`);
  if (type === "atom") {
    const atomValueId = data[0].id;
    const atomValeData = await apiCallGet(`/read/atomValues/${atomValueId}`);
    data[0].atomValue = atomValeData[0].value;
  }
  return data;
}
