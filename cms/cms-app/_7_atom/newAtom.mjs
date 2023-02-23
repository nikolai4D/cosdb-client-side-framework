import { getUuid } from "../requests/getUuid.mjs";

export async function newAtom(key, value, parentId) {
  const atom = {};
  atom.customType = "atom";
  atom.key = key;
  atom.value = value;
  atom.id = await getUuid();
  atom.parentId = parentId;
  atom.valueDisabled = true;

  return atom;
}
