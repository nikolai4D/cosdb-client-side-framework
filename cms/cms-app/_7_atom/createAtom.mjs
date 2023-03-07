import { getConstructors } from "../functions/getConstructors.mjs";
import { input } from "../types/input.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function createAtom(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "atoms";
  const atomBody = document.createElement("div");

  //--------------------------------

  //get valueOptions for atom

  const constructorTypeAtoms = "value";

  const atomValues = await getConstructors(
    filename,
    constructorTypeAtoms,
    type
  );

  if (atomValues) {
    await createValueOptionEls(atomValues, id, atomBody, componentBody);
  }

  function createValueOptionEls(subComps, id, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);

      const customType = "valueOptions";
      const id = await getUuid();
      const parentId = id;
      const valueDisabled = false;

      let childSlot = await input(
        customType,
        key,
        value,
        id,
        parentId,
        valueDisabled
      );
      parentBody.appendChild(childSlot);
    });
  }
}
