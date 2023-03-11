import { State } from "../State.mjs";

export async function mutation_updateState(customType, data) {
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    customTypeData.splice(index, 1, data);
  } else {
    customTypeData.push(data);
  }

  State[customType] = await customTypeData;

  console.log("State, mutation from customType: ", customType, { State });
  return State;
}
