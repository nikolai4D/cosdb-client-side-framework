import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getFunction } from "./getFunction.mjs";
// import { createComponent } from "./helpers.mjs";
import { createComponent } from "./helpers/createComponent.mjs";

export async function getOrganism(module, parentId, orgId = null) {
  const modelOrganisms = await apiCallGet(`/read/organisms`);
  const modelChildOrganisms = await apiCallGet(`/read/organisms`);
  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  const type = "organism";

  const organism = orgId
    ? modelOrganisms.filter((organism) => organism.id === orgId)
    : modelOrganisms.filter((organism) => organism.parentId === parentId);

  const organismId = organism[0].id;

  //childOrganisms
  const childOrganisms = modelChildOrganisms.filter(
    (organism) => organism.parentId === organismId
  );
  const childOrganismsObjects = [];
  if (childOrganisms.length > 0) {
    for (const childOrganism of childOrganisms) {
      const childOrgId = parseInt(childOrganism.key.split(" ")[1]);
      const childModule = childOrganism.value;
      const childOrganismObject = await getOrganism(
        childModule,
        organismId,
        childOrganism.id
      );
      childOrganismsObjects.push({
        id: childOrgId,
        organism: childModule,
        component: childOrganismObject,
      });
    }
  }

  //molecules
  const moleculesObject = [];
  const molecules = modelMolecules.filter(
    (molecule) => molecule.parentId === organismId
  );

  for (const molecule of molecules) {
    const value = molecule.value;
    const moleculeObject = await getMolecule(value, organismId, molecule.id);

    const moleculeId = parseInt(molecule.key.split(" ")[1]);
    moleculesObject.push({
      id: moleculeId,
      molecule: value,
      component: moleculeObject,
    });
  }

  //functions
  const functionsObject = [];
  const funcs = modelFunctions.filter((func) => func.parentId === organismId);
  for (const func of funcs) {
    const value = func.value;
    const parameters = func.parameters;
    const funcObject = await getFunction(value, organismId);
    const funcId = parseInt(func.key.split(" ")[1]);
    functionsObject.push({
      id: funcId,
      value: value,
      parameters: parameters,
      function: funcObject,
    });
  }

  const organismObject = await createComponent(type, module);

  //   organismObject.organisms = childOrganismsObjects;
  //   organismObject.molecules = moleculesObject;
  //   organismObject.functions = functionsObject;

  //   const renderOrganism = await organismObject.render();

  //   return await renderOrganism;
  // }

  return {
    comp: organismObject,
    organisms: childOrganismsObjects,
    molecules: moleculesObject,
    functions: functionsObject,
  };
}
