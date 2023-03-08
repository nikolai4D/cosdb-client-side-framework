import { getConstructors } from "../functions/getConstructors.mjs";
import { input } from "../types/input.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function createAtom(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "atoms";
  const atomBody = document.createElement("div");

  const parentId = id;

  //--------------------------------

  //get valueOptions for atom

  const constructorTypeAtomValue = "value";

  const atomValues = await getConstructors(
    filename,
    constructorTypeAtomValue,
    type
  );

  if (atomValues) {
    await createValueEls(atomValues, parentId, atomBody, componentBody);
  }

  function createValueEls(subComps, prntId, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);

      const customType = "atomValue";
      const id = await getUuid();
      const parentId = prntId;
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
