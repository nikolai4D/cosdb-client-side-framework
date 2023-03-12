import { deleteChildren } from "../../functions/deleteChildren.mjs";
import { State } from "../State.mjs";

export async function mutation_updateState(customType, data) {
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    if (customType === "viewTemplates" || customType === "components") {
      await deleteChildren(data.id);
    }
    customTypeData.splice(index, 1, data);
  } else {
    customTypeData.push(data);
  }

  State[customType] = await customTypeData;
  return State;
}
