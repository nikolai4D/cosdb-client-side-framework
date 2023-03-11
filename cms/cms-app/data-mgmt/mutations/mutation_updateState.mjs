import { State } from "../State.mjs";

export async function mutation_updateState(customType, data) {
  const customTypeData = await State[customType];
  const index = await customTypeData.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    customTypeData.splice(index, 1, data);
  } else {
    if (customType === "viewTemplates" || customType === "components") {
      await deleteChildren(data.id);
    }

    customTypeData.push(data);
  }

  State[customType] = await customTypeData;

  //console.log("State, mutation from customType: ", customType, { State });
  return State;
}

async function deleteChildren(id) {
  // Find all items in State with parentId equal to id
  const children = [];
  for (const key of Object.keys(State)) {
    const items = State[key];
    for (const item of items) {
      if (item.parentId === id) {
        children.push(item);
      }
    }
  }

  // Recursively delete all children of the children
  for (const child of children) {
    await deleteChildren(child.id);
  }

  // Remove all items with parentId equal to id or any of its descendants' id
  for (const key of Object.keys(State)) {
    const items = State[key];
    State[key] = items.filter(
      (item) =>
        item.parentId !== id &&
        !children.find((child) => child.id === item.parentId)
    );
  }
}
