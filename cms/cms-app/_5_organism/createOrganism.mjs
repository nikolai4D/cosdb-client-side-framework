import { Organism } from "./Organism.mjs";
import { newOrganism } from "./newOrganism.mjs";
import { Molecule } from "../_6_molecule/Molecule.mjs";
import { newMolecule } from "../_6_molecule/newMolecule.mjs";
import { createMolecule } from "../_6_molecule/createMolecule.mjs";

import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export const createOrganism = async (componentBody, id, selectedValue) => {
  // action.create(id, selectedValue, parentId, "organisms");

  const parentId = id;

  const organismDiv = document.createElement("div");

  const filename = selectedValue;
  const type = "organisms";
  const organismBody = document.createElement("div");
  const subBody = document.createElement("div");

  const organismSlot = await Organism(
    await newOrganism("Organism", selectedValue, parentId),
    organismBody
  );

  //--------------------------------

  //get subOrganisms

  const constructorTypeOrganisms = "organisms";

  const subOrganisms = await getConstructors(
    filename,
    constructorTypeOrganisms,
    type
  );

  if (subOrganisms) {
    await createSubOrganismsEl(subOrganisms, id, subBody, organismBody);
  }

  //--------------------------------

  //get Molecules

  const constructorTypeMolecules = "molecules";

  const componentMolecules = await getConstructors(
    filename,
    constructorTypeMolecules,
    type
  );

  if (componentMolecules) {
    await createSubMoleculesEl(componentMolecules, id, subBody, organismBody);
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
    await createFunctionsEl(componentFunctions, id, subBody, organismBody);
  }

  componentBody.appendChild(organismSlot);
};

function createSubOrganismsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    const parentId = id;

    let childSlot = await Organism(
      await newOrganism(key, value, parentId),
      compBody
    );

    parentBody.appendChild(childSlot);

    // get the id of the new organism, to then get the body of the organism

    let slotEls = childSlot.getElementsByTagName("input");
    let newId = slotEls[0].id;
    let nextLevelBody = document.getElementById("accordion-body-" + newId);

    await createOrganism(nextLevelBody, newId, value);
  });
}

function createSubMoleculesEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    const parentId = id;

    let childSlot = await Molecule(
      await newMolecule(key, value, parentId),
      compBody
    );
    parentBody.appendChild(childSlot);

    // get the id of the new Molecule, to then get the body of the Molecule

    let slotEls = childSlot.getElementsByTagName("input");
    let newId = slotEls[0].id;
    let nextLevelBody = document.getElementById("accordion-body-" + newId);

    await createMolecule(nextLevelBody, newId, value);
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
