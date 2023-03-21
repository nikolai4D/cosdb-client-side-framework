import { deleteChildren } from "../../functions/deleteChildren.mjs";
import { State } from "../State.mjs";

export async function mutation_updateState(
  customType,
  data,
  triggeredFromChange = false
) {
  console.log({ customType, data });
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);
  console.log(customTypeData + " " + index + "before IFS");

  if (index !== -1) {
    if (customType === "viewTemplates" || customType === "components") {
      if (triggeredFromChange) {
        await deleteChildren(data.id);
      }
    }
    if (customType === "functions") {
      console.log({ datavalue: data.value });
      if (data.value === "") {
        console.log(customTypeData + " " + index + " before splice");
        customTypeData.splice(index, 1);
        console.log(customTypeData + " " + index + " after splice");
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
