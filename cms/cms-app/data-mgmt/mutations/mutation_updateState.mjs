import { State } from "../State.mjs";

export function mutation_updateState(customType, data) {
  const customTypeData = State[customType];
  const index = customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    customTypeData.splice(index, 1, data);
  } else {
    customTypeData.push(data);
  }

  State[customType] = customTypeData;

  console.log("State, mutation from customType: ", customType, { State });
}
