import { State } from "../State.mjs";

export async function mutation_updateState(customType, data) {
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    customTypeData.splice(index, 1, data);
  } else {
    if (
      customType === "views" ||
      customType === "viewTemplates" ||
      customType === "components"
    ) {
      await deleteChildren(id);
    }

    customTypeData.push(data);
  }

  State[customType] = await customTypeData;

  //console.log("State, mutation from customType: ", customType, { State });
  return State;
}

async function deleteChildren(id) {
  // Find all items in State with parentId equal to id
  for (const key of Object.keys(State)) {
    const items = State[key];
    for (const item of items) {
      if (item.parentId === id) {
        await deleteChildren(item.id);
      }
    }
  }

  // Remove all items with parentId equal to id or any of its descendants' id
  for (const key of Object.keys(State)) {
    const items = State[key];
    State[key] = items.filter((item) => item.parentId !== id && item.id !== id);
  }
}
