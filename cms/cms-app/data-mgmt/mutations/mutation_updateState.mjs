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
      customTypeData.splice(index, 1, data);
    }
    if (customType === "functions") {
      if (data.value === "") {
        console.log("data.value === ''", data.value);
        customTypeData.splice(index, 1);
      } else {
        console.log("1");
        customTypeData.splice(index, 1, data);
      }
    }
    if (customType === "views") {
      console.log("2");
      data.valueDisabled = customTypeData[index].valueDisabled;
      data.protected = customTypeData[index].protected;
      data.startView = customTypeData[index].startView;

      customTypeData.splice(index, 1, data);
    }
    if (
      customType === "slots" ||
      customType === "organisms" ||
      customType === "molecules" ||
      customType === "atoms" ||
      customType === "atomValues"
    ) {
      console.log("3", customType);
      customTypeData.splice(index, 1, data);
    }
  } else {
    console.log("4");
    customTypeData.push(data);
  }

  console.log(await customTypeData);

  State[customType] = await customTypeData;
  return State;
}
