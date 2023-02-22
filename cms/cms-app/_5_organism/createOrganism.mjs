import { Organism } from "./Organism.mjs";
import { newOrganism } from "./newOrganism.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createOrganism(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "organisms";

  const organismBody = document.createElement("div");

  //get subOrganisms
  const constructorTypeOrganisms = "organisms";
  const componentOrganisms = await getConstructors(
    filename,
    constructorTypeOrganisms,
    type
  );
  componentOrganisms.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);
    console.log({ key, value });
  });

  //get Molecules
  const constructorTypeMolecules = "molecules";
  const componentMolecules = await getConstructors(
    filename,
    constructorTypeMolecules,
    type
  );
  componentMolecules.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);
    console.log({ key, value });
  });

  //get Functions
  const constructorTypeFunctions = "functions";
  const componentFunctions = await getConstructors(
    filename,
    constructorTypeFunctions,
    type
  );
  componentFunctions.forEach(async (slot) => {
    const [[key, value]] = Object.entries(slot);
    console.log({ key, value });
  });

  const organismKey = key;
  const organismValue = value;
  const organismParentId = id;

  const childSlot = await Organism(
    await newOrganism(organismKey, organismValue, organismParentId),
    organismBody
  );

  componentBody.appendChild(childSlot);
}
