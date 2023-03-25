import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function getMolecule(module, parentId) {
  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtomValues = await apiCallGet(`/read/atomValues`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  type = "molecule";
  //component.molecules = content.molecules;
  //component.atoms = content.atoms;
  //component.functions = content.functions;
  return comp;
}
