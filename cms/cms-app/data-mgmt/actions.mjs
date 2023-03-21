import { writeModel } from "./requests/writeModel.mjs";

export const action = {
  create: async function (id, value, parentId, type) {
    try {
      let newElement = {
        id,
        value,
        parentId,
      };

      let existingElement = State[type].find((el) => el.id === id);
      existingElement
        ? (existingElement.value = value)
        : State[type].push(newElement);
    } catch (error) {
      console.log("error in updateModel", error);
    }
  },
  updateModel: async function (data) {
    try {
      await writeModel(data);
    } catch {
      console.log("error in updateModel");
    }
  },
};
