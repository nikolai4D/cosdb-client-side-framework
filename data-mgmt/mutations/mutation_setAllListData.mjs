import { State } from "../State.mjs";

export async function mutation_setAllListData(type, sortedData) {
  console.log("mutation_setAllListData: ", type, sortedData);
  State[type] = await sortedData;
  console.log("State.items: ", State.items);
}
