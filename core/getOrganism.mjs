import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getMolecule } from "./getMolecule.mjs";
import { getFunction } from "./getFunction.mjs";
import { createComponent } from "./helpers.mjs";

export async function getOrganism(module, parentId) {
  const modelOrganims = await apiCallGet(`/read/organisms`);
  const modelMolecules = await apiCallGet(`/read/molecules`);

  const modelFunctions = await apiCallGet(`/read/functions`);

  const type = "organism";

  const organism = modelOrganims.filter(
    (organism) => organism.parentId === parentId
  );
  const organismId = organism[0].id;

  //childOrganisms
  //await getOrganism(module, moleculeId);

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

  const renderOrganism = await organismObject.render();

  return await renderOrganism;
}
