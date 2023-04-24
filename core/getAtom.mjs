import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers/createComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getAtom(module, parentId, atomId = null) {
  const type = "atom";
  //const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtoms = State.components.atoms;
  console.log(modelAtoms);
  //const modelAtomValues = await apiCallGet(`/read/atomValues`);
  const modelAtomValues = State.components.atomValues;
  console.log(modelAtomValues);

  const atom = atomId
    ? modelAtoms.filter((at) => at.id === atomId)
    : modelAtoms.filter((at) => at.parentId === parentId);

  console.log(atom);

  const atomValue = modelAtomValues.filter(
    (atv) => atv.parentId === atom[0].id
  );

  const atomObject = await createComponent(type, module);

  return { comp: atomObject, value: atomValue };
}
