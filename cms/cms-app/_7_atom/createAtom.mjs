import { Atom } from "../_7_atom/Atom.mjs";
import { newAtom } from "../_7_atom/newAtom.mjs";

import { getConstructors } from "../functions/getConstructors.mjs";
import { input } from "../types/input.mjs";
import { getUuid } from "../requests/getUuid.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function createAtom(componentBody, id, selectedValue) {
  const subComponentBody = document.createElement("div");
  const newAtm = await newAtom("atom", selectedValue, id);
  const atomSlot = await Atom(newAtm, subComponentBody);

  componentBody.appendChild(atomSlot);

  await createSubAtom(subComponentBody, newAtm.id, selectedValue);
}

export async function createSubAtom(subComponentBody, id, selectedValue) {
  ///--------------------------------

  const filename = selectedValue;
  const type = "atoms";
  const atomBody = document.createElement("div");

  const parentId = id;

  //--------------------------------

  //get values for atom

  const constructorTypeAtomValue = "value";

  const atomValues = await getConstructors(
    filename,
    constructorTypeAtomValue,
    type
  );

  if (atomValues) {
    await createValueEls(atomValues, parentId, atomBody, subComponentBody);
  }

  function createValueEls(subComps, prntId, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);

      const customType = "atomValue";
      const id = await getUuid();
      const parentId = prntId;
      const valueDisabled = false;

      const atomValue = {};
      atomValue.customType = customType;
      atomValue.id = id;
      atomValue.key = key;
      atomValue.value = value;
      atomValue.parentId = parentId;
      atomValue.valueDisabled = valueDisabled;

      let childSlot = await input(
        customType,
        key,
        value,
        id,
        parentId,
        valueDisabled
      );
      parentBody.appendChild(childSlot);

      await mutation_updateState("atomValues", atomValue);
    });
  }
}
