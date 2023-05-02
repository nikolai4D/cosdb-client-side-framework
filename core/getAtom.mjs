import { createComponent } from "./helpers/createComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getAtom(module, parentId, atomId = null) {
  const type = "atom";

  const modelAtoms = State.components.atoms;

  const modelAtomValues = State.components.atomValues;

  const atom = atomId
    ? modelAtoms.filter((at) => at.id === atomId)
    : modelAtoms.filter((at) => at.parentId === parentId);

  const atomValue = modelAtomValues.filter(
    (atv) => atv.parentId === atom[0].id
  );

  const atomObject = await createComponent(type, module);

  return { comp: atomObject, value: atomValue };
}
