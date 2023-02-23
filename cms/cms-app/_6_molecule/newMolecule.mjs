import { getUuid } from "../requests/getUuid.mjs";

export async function newMolecule(key, value, parentId) {
  const molecule = {};
  molecule.customType = "molecule";
  molecule.key = key;
  molecule.value = value;
  molecule.id = await getUuid();
  molecule.parentId = parentId;
  molecule.valueDisabled = true;

  return molecule;
}
