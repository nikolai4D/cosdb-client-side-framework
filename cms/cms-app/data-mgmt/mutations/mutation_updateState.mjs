import { deleteChildren } from "../../functions/deleteChildren.mjs";
import { State } from "../State.mjs";

export async function mutation_updateState(
  customType,
  data,
  triggeredFromChange = false
) {
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    if (customType === "viewTemplates" || customType === "components") {
      if (triggeredFromChange) {
        await deleteChildren(data.id);
      }
    }
    if (customType === "functions") {
      if (data.value === "") {
        customTypeData.splice(index, 1);
      } else {
        customTypeData.splice(index, 1, data);
      }
    }
    if (customType === "views") {
      data.valueDisabled = customTypeData[index].valueDisabled;
      data.protected = customTypeData[index].protected;
      data.startView = customTypeData[index].startView;

      customTypeData.splice(index, 1, data);
    } else {
      customTypeData.splice(index, 1, data);
    }
  } else {
    customTypeData.push(data);
  }

  State[customType] = await customTypeData;
  return State;
}
