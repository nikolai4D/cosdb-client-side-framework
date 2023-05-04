import { State } from "../State.mjs";

export async function mutation_setParentIds(type, sortedData) {
  State[type] = await sortedData;
}
