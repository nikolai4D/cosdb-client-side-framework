import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers.mjs";

export async function getAtom(module, parentId) {
  //   const divAtom = document.createElement("div");
  //   divAtom.classList.add("atom");
  //   divAtom.setAttribute("id", parentId);

  const type = "atom";
  const modelAtoms = await apiCallGet(`/read/atoms`);
  const modelAtomValues = await apiCallGet(`/read/atomValues`);

  const atom = modelAtoms.filter((atom) => atom.parentId === parentId);
  const atomValue = modelAtomValues.filter(
    (atomValue) => atomValue.parentId === atom[0].id
  );

  const atomObject = await createComponent(type, module);
  atomObject.value = [{ value: atomValue[0].value }];

  const renderAtom = await atomObject.render();

  return await renderAtom;
}
