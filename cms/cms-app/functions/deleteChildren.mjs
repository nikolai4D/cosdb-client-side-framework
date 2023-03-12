import { State } from "../data-mgmt/State.mjs";

let counter = 0;

export async function deleteChildren(id) {
  counter++;
  console.log(`deleteChildren called with id=${id}, counter=${counter}`);
  // Find all items in State with parentId equal to i

  const children = [];
  for (const key of Object.keys(State)) {
    if (Array.isArray(State[key])) {
      const items = State[key];
      for (const item of items) {
        if (item.parentId === id) {
          children.push(item);
        }
      }
    }
  }

  // Recursively delete all children of the children
  for (const child of children) {
    await deleteChildren(child.id);
  }

  console.log("children: ", children);

  // Remove all items with parentId equal to id or any of its descendants' id
  for (const key of Object.keys(State)) {
    if (Array.isArray(State[key])) {
      const items = State[key];
      State[key] = items.filter(
        (item) =>
          item.parentId !== id &&
          !children.find((child) => child.id === item.parentId)
      );
    }
  }
  // Clear the children array
  children.length = 0;
}
