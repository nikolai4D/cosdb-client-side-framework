import { State } from "../data-mgmt/State.mjs";

export async function deleteChildren(id) {
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

  //   Recursively delete all children of the children
  for (const child of children) {
    if (!path.includes(child.parentId)) {
      await deleteChildren(child.id, [...path, child.parentId]);
    }
  }

  console.log("children: ", children);

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
