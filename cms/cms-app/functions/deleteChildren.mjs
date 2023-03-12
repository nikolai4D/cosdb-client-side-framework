import { State } from "../data-mgmt/State.mjs";

export async function deleteChildren(id) {
  const stack = [];
  stack.push(id);

  while (stack.length > 0) {
    const currentId = stack.pop();

    // Find all items in State with parentId equal to currentId
    const children = [];
    for (const key of Object.keys(State)) {
      if (Array.isArray(State[key])) {
        const items = State[key];
        for (const item of items) {
          if (item.parentId === currentId) {
            children.push(item);
          }
        }
      }
    }

    // Remove all items with parentId equal to currentId or any of its descendants' id
    for (const key of Object.keys(State)) {
      if (Array.isArray(State[key])) {
        const items = State[key];
        State[key] = items.filter(
          (item) =>
            item.parentId !== currentId &&
            !children.find((child) => child.id === item.parentId)
        );
      }
    }

    // Add all children to the stack for processing
    for (const child of children) {
      stack.push(child.id);
    }
  }
}
