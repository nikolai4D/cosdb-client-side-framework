
import { Molecule } from "./Molecule.mjs";
import { newMolecule } from "./newMolecule.mjs";
import { createAtom } from "../_7_atom/createAtom.mjs";
import { Atom } from "../_7_atom/Atom.mjs";
import { newAtom } from "../_7_atom/newAtom.mjs";
import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createMolecule(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "molecules";
  const organismBody = document.createElement("div");


  //--------------------------------

    // get atoms

  const constructorTypeAtoms = "atoms";

  const componentAtoms = await getConstructors(
    filename,
    constructorTypeAtoms,
    type
    );

  if (componentAtoms) {
    await createSubAtomsEl(
      componentAtoms,
      id,
      organismBody,
      componentBody
    );
  }


  //--------------------------------

  // get Functions

  const constructorTypeFunctions = "functions";

  const componentFunctions = await getConstructors(
    filename,
    constructorTypeFunctions,
    type
  );

  if (componentFunctions) {
    await createFunctionsEl(
      componentFunctions,
      id,
      organismBody,
      componentBody
    );
  }
}

function createSubAtomsEl(subComps, id, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);
      const parentId = id;
  
      let childSlot = await Atom(
        await newAtom(organismKey, organismValue, parentId),
        compBody
      )
  
      parentBody.appendChild(childSlot);

      // get the id of the new atom, and use it to get the body of the atom

      let slotEls = childSlot.getElementsByTagName("input")
      let newId = slotEls[0].id
      let nextLevelBody = document.getElementById("accordion-body-"+newId)
  
      await createAtom(nextLevelBody, newId, organismValue) 
  
    });
  }

function createFunctionsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);

    const organismKey = key;
    const organismValue = value;
    const organismParentId = id;

    let childSlot = await Function(
      await newFunction(organismKey, organismValue, organismParentId),
      compBody
    )

    parentBody.appendChild(childSlot);

  });
}


