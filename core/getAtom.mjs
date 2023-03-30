import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { createComponent } from "./helpers.mjs";
import { createComponent } from "./helpers/createComponent.mjs";

export async function getAtom(module, parentId, atomId = null) {
  const type = "atom";
  const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtomValues = await apiCallGet(`/read/atomValues`);

  const atom = atomId
    ? modelAtoms.filter((atom) => atom.id === atomId)
    : modelAtoms.filter((atom) => atom.parentId === parentId);

  const atomValue = modelAtomValues.filter(
    (atomValue) => atomValue.parentId === atom[0].id
  );

  const atomObject = await createComponent(type, module);
  atomObject.value = [{ value: atomValue[0].value }];

  //console.log("atomObject", atomObject);

  const renderAtom = await atomObject.render();
  //console.log("renderAtom", renderAtom);

  return await renderAtom;
}
