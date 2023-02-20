import { importModuleFromFile } from "./importModuleFromFile.mjs";
import { getUuid } from "../requests/getUuid.mjs";

export async function getSlots(filename) {
  const file = `${filename}.mjs`;
  const module = await importModuleFromFile(file, filename);
  const slots = module.slots;
  for (const slot of slots) {
    slot.id = await getUuid();
    slot.component = {};
  }

  return slots;
}
