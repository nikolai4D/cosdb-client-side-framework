import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function getOrganism(module, parentId) {
  const modelOrganisms = await apiCallGet(`/read/organisms`);
  const modelMolecules = await apiCallGet(`/read/molecules`);
  const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtomValues = await apiCallGet(`/read/atomValues`);
  const modelFunctions = await apiCallGet(`/read/functions`);

  type = "organism";

  //component.organisms = content.organisms;
  //component.molecules = content.molecules;
  //component.functions = content.functions;
  return comp;
}
