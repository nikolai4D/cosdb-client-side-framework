import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers/createComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getAtom(module, parentId, atomId = null) {
  const type = "atom";
  //const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtoms = State.components.atoms;
  //const modelAtomValues = await apiCallGet(`/read/atomValues`);
  const modelAtomValues = State.components.atomValues;

  const atom = atomId
    ? modelAtoms.filter((atom) => atom.id === atomId)
    : modelAtoms.filter((atom) => atom.parentId === parentId);

  const atomValue = modelAtomValues.filter(
    (atomValue) => atomValue.parentId === atom[0].id
  );

  const atomObject = await createComponent(type, module);

  return { comp: atomObject, value: atomValue };
}
