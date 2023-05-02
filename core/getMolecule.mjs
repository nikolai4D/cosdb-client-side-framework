import { getAtom } from "./getAtom.mjs";
import { getFunction } from "./getFunction.mjs";
import { createComponent } from "./helpers/createComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getMolecule(module, parentId, molId = null) {
  const modelMolecules = State.components.molecules;

  const modelAtoms = State.components.atoms;

  const modelFunctions = State.components.functions;

  const type = "molecule";

  const molecule = molId
    ? modelMolecules.filter((molecule) => molecule.id === molId)
    : modelMolecules.filter((molecule) => molecule.parentId === parentId);

  const moleculeId = molecule[0].id;

  //atoms
  const atomsObject = [];
  const atoms = modelAtoms.filter((atom) => atom.parentId === moleculeId);

  for (const atom of atoms) {
    const value = atom.value;
    const atomObject = await getAtom(value, moleculeId, atom.id);

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
    console.log(func);
    const value = func.value;
    const parameters = func.parameters;
    const funcObject = await getFunction(value, moleculeId);
    const funcId = parseInt(func.key.split(" ")[1]);
    functionsObject.push({
      id: funcId,
      value: value,
      parameters: parameters,
      function: funcObject,
    });
  }

  const moleculeObject = await createComponent(type, module);

  return {
    comp: moleculeObject,
    atoms: atomsObject,
    functions: functionsObject,
  };
}
