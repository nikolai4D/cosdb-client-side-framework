// import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { getMolecule } from "./getMolecule.mjs";
// import { getFunction } from "./getFunction.mjs";
// import { createComponent } from "./helpers.mjs";

// export async function getOrganism(module, parentId) {
//   const modelOrganisms = await apiCallGet(`/read/organisms`);
//   const modelMolecules = await apiCallGet(`/read/molecules`);

//   const modelFunctions = await apiCallGet(`/read/functions`);

//   const type = "organism";

//   const organism = modelOrganisms.filter(
//     (organism) => organism.parentId === parentId
//   );
//   const organismId = organism[0].id;

//   //childOrganisms
//   ??? an organism could have child organisms. Call getOrganism recursively but how?

//   //molecules
//   const moleculesObject = [];
//   const molecules = modelMolecules.filter(
//     (molecule) => molecule.parentId === organismId
//   );

//   for (const molecule of molecules) {
//     const value = molecule.value;
//     const moleculeObject = await getMolecule(value, organismId, molecule.id);

//     const moleculeId = parseInt(molecule.key.split(" ")[1]);
//     moleculesObject.push({
//       id: moleculeId,
//       value: value,
//       component: moleculeObject,
//     });
//   }

//   //functions
//   const functionsObject = [];
//   const funcs = modelFunctions.filter(
//     (func) => func.parentId === molecule[0].id
//   );
//   for (const func of funcs) {
//     const value = func.value;
//     const funcObject = await getFunction(value, moleculeId);
//     const funcId = parseInt(func.key.split(" ")[1]);
//     functionsObject.push({
//       id: funcId,
//       value: value,
//       function: await funcObject,
//     });
//   }

//   const organismObject = await createComponent(type, module);
//   organismObject.molecules = moleculesObject;
//   organismObject.functions = functionsObject;

//   organismObject.organisms = ??? if there are child organisms, add them here

//   const renderOrganism = await organismObject.render();

//   return await renderOrganism;
// }

import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getFunction } from "./getFunction.mjs";
import { createComponent } from "./helpers.mjs";

export async function getOrganism(module, parentId, orgId = null)) {
  const modelOrganisms = await apiCallGet(`/read/organisms`);
  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  const type = "organism";

//   const organism = modelOrganisms.filter(
//     (organism) => organism.parentId === parentId
//   );

    const organism = orgId
      ? modelOrganisms.filter((organism) => organism.id === orgId)
      : modelOrganisms.filter((organism) => organism.parentId === parentId);

  const organismId = organism[0].id;

  //childOrganisms
  const childOrganisms = modelOrganisms.filter(
    (organism) => organism.parentId === organismId
  );
  const childOrganismsObjects = [];
  for (const childOrganism of childOrganisms) {
    const childModule = childOrganism.value;
    const childOrganismObject = await getOrganism(childModule, organismId , childOrganism.id);
    childOrganismsObjects.push(childOrganismObject);
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
      value: value,
      component: moleculeObject,
    });
  }

  //functions
  const functionsObject = [];
  const funcs = modelFunctions.filter(
    (func) => func.parentId === molecule[0].id
  );
  for (const func of funcs) {
    const value = func.value;
    const funcObject = await getFunction(value, moleculeId);
    const funcId = parseInt(func.key.split(" ")[1]);
    functionsObject.push({
      id: funcId,
      value: value,
      function: await funcObject,
    });
  }

  const organismObject = await createComponent(type, module);
  organismObject.molecules = moleculesObject;
  organismObject.functions = functionsObject;

  if (childOrganismsObjects.length > 0) {
    organismObject.organisms = childOrganismsObjects; // Assign the child organisms only if there are any
  }

  const renderOrganism = await organismObject.render();

  return await renderOrganism;
}
