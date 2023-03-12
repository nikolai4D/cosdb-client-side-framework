import { State } from "../data-mgmt/State.mjs";

const CHILDREN_MAP = {
  functions: ["organisms", "molecules", "atoms"],
  atomValues: ["atoms"],
  atoms: ["molecules", "components"],
  molecules: ["organisms", "components"],
  organisms: ["organisms", "components"],
  components: ["slots"],
  slots: ["viewTemplates"],
  viewTemplates: ["views"],
};

function findObjectById(id) {
  for (const key of Object.keys(State)) {
    const items = State[key];
    const foundItem = items.find((item) => item.id === id);
    if (foundItem) {
      return foundItem;
    }
  }
  return null;
}

export async function deleteChildren(id) {
  const foundItem = findObjectById(id);
  if (!foundItem) {
    return;
  }
  const stack = [foundItem.id];
  while (stack.length > 0) {
    const currentId = stack.pop();
    for (const key of Object.keys(State)) {
      const items = State[key];
      State[key] = items.filter((item) => item.id !== currentId);
      if (
        CHILDREN_MAP[key] &&
        CHILDREN_MAP[key].includes(foundItem.customType)
      ) {
        const childrenIds = items
          .filter((item) => item.parentId === currentId)
          .map((item) => item.id);
        stack.push(...childrenIds);
      }
    }
  }
}
