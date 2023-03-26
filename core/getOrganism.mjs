import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getFunction } from "./getFunction.mjs";
import { createComponent } from "./helpers.mjs";

export async function getOrganism(module, parentId, orgId = null) {
  //   console.log(orgId, "orgId", parentId, "parentId", module, "module");
  const modelOrganisms = await apiCallGet(`/read/organisms`);
  const modelChildOrganisms = await apiCallGet(`/read/organisms`);
  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  const type = "organism";

  //   const organism = modelOrganisms.filter(
  //     (organism) => organism.parentId === parentId
  //   );

  const organism = orgId
    ? modelOrganisms.filter((organism) => organism.id === orgId)
    : modelOrganisms.filter((organism) => organism.parentId === parentId);

  console.log("organism", organism, "module", module);

  const organismId = organism[0].id;

  //childOrganisms
  const childOrganisms = modelChildOrganisms.filter(
    (organism) => organism.parentId === organismId
  );
  const childOrganismsObjects = [];
  if (childOrganisms.length > 0) {
    console.log("childOrganisms", childOrganisms);
    for (const childOrganism of childOrganisms) {
      console.log(childOrganism, "childOrganism");
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
    const funcObject = await getFunction(value, organismId);
    const funcId = parseInt(func.key.split(" ")[1]);
    functionsObject.push({
      id: funcId,
      value: value,
      function: await funcObject,
    });
  }

  const organismObject = await createComponent(type, module);
  console.log("organismObject", organismObject);
  organismObject.organisms = childOrganismsObjects;
  organismObject.molecules = moleculesObject;
  organismObject.functions = functionsObject;

  //   organismObject.updateChildOrganisms = () => {
  //     if (childOrganismsObjects.length > 0) {
  //       organismObject.organisms = childOrganismsObjects;
  //     }
  //   };

  const renderOrganism = await organismObject.render();
  //   organismObject.updateChildOrganisms(); // Update child organisms after rendering

  console.log("renderOrganism  !!!!!!!!!!!!!!!!!!!!!", renderOrganism);

  return await renderOrganism;
}
