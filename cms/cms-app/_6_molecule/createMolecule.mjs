import { Organism } from "./Organism.mjs";
import { newOrganism } from "./newOrganism.mjs";
import { Molecule } from "../_6_molecule/Molecule.mjs";
import { newMolecule } from "../_6_molecule/newMolecule.mjs";
import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createMolecule(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "molecules";
  const organismBody = document.createElement("div");


  //--------------------------------

  //get Molecules

  const constructorTypeMolecules = "molecules";

  const componentMolecules = await getConstructors(
    filename,
    constructorTypeMolecules,
    type
    );

  if (componentMolecules) {
    await createSubMoleculesEl(
      componentMolecules,
      id,
      organismBody,
      componentBody
    );
  }


  //--------------------------------

  //get Molecules

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

function createSubMoleculesEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    console.log({ key, value });

    const organismKey = key;
    const organismValue = value;
    const organismParentId = id;

    let childSlot = await Molecule(
      await newMolecule(organismKey, organismValue, organismParentId),
      compBody
    )

    parentBody.appendChild(childSlot);

  });
}

function createSubAtomsEl(subComps, id, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);
      console.log({ key, value });
  
      const organismKey = key;
      const organismValue = value;
      const organismParentId = id;
  
      let childSlot = await Atom(
        await newAtom(organismKey, organismValue, organismParentId),
        compBody
      )
  
      parentBody.appendChild(childSlot);
  
    });
  }

function createFunctionsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    console.log({ key, value });

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


