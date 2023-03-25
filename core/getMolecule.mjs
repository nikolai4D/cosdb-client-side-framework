import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getAtom } from "./getAtom.mjs";
import { getFunction } from "./getFunction.mjs";
import { createComponent } from "./helpers.mjs";

export async function getMolecule(module, parentId) {
  const divMolecule = document.createElement("div");
  divMolecule.classList.add("molecule");
  divMolecule.setAttribute("id", parentId);

  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  const type = "molecule";

  const molecule = modelMolecules.filter(
    (molecule) => molecule.parentId === parentId
  );
  const moleculeId = molecule[0].id;

  //atoms
  const atomsObject = [];
  const atoms = modelAtoms.filter((atom) => atom.parentId === molecule[0].id);
  for (const atom of atoms) {
    const value = atom.value;
    const atomObject = await getAtom(value, moleculeId);
    const atomId = parseInt(atom.key.split(" ")[1]);
    atomsObject.push({
      id: atomId,
      value: value,
      component: atomObject,
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

  const moleculeObject = await createComponent(type, module);
  moleculeObject.atoms = atomsObject;
  moleculeObject.functions = functionsObject;

  console.log(atomsObject, "atomsObject");

  const renderMolecule = await moleculeObject.render();

  //   const renderMoleculeArray = Array.from(renderMolecule);

  //   for (const child of renderMoleculeArray) {
  //     divMolecule.appendChild(child);
  //   }

  //   return divMolecule;
  return renderMolecule;
}
