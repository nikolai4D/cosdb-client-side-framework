import { Molecule } from "./Molecule.mjs";
import { newMolecule } from "./newMolecule.mjs";
import { createSubAtom } from "../_7_atom/createAtom.mjs";
import { Atom } from "../_7_atom/Atom.mjs";
import { newAtom } from "../_7_atom/newAtom.mjs";
import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createMolecule(componentBody, id, selectedValue) {
  const subComponentBody = document.createElement("div");
  const newMol = await newMolecule("molecule", selectedValue, id);
  const moleculeSlot = await Molecule(newMol, subComponentBody);

  console.log(newMol, "newMol!!!!!!!!!!!!!!");
  componentBody.appendChild(moleculeSlot);

  await createSubMolecule(subComponentBody, newMol.id, selectedValue);
}

export async function createSubMolecule(subComponentBody, id, selectedValue) {
  ///--------------------------------

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
    await createSubAtomsEl(componentAtoms, id, organismBody, subComponentBody);
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
      subComponentBody
    );
  }
}

function createSubAtomsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    const parentId = id;

    let childSlot = await Atom(await newAtom(key, value, parentId), compBody);

    parentBody.appendChild(childSlot);

    // get the id of the new atom, and use it to get the body of the atom

    let slotEls = childSlot.getElementsByTagName("input");
    let newId = slotEls[0].id;
    let nextLevelBody = document.getElementById("accordion-body-" + newId);

    await createSubAtom(nextLevelBody, newId, value);
  });
}

function createFunctionsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    const parentId = id;

    let childSlot = await Function(await newFunction(parentId), compBody);

    parentBody.insertBefore(childSlot, parentBody.firstChild);
  });
}
