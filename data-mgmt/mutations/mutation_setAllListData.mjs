import { State } from "../state.mjs";

export async function mutation_setAllListData(type, sortedData) {
  State[type] = sortedData;
}
