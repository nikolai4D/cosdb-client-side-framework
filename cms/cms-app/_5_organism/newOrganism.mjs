import { getUuid } from "../requests/getUuid.mjs";

export async function newOrganism(key, value, parentId) {
  const organism = {};
  organism.customType = "organism";
  organism.key = key;
  organism.value = value;
  organism.id = await getUuid();
  organism.parentId = parentId;
  organism.valueDisabled = true;

  return organism;
}
