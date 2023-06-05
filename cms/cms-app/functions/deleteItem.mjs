import { State } from "../data-mgmt/State.mjs";

export async function deleteItem(id) {
  // Remove item by ID

  for (const key of Object.keys(State)) {
    if (Array.isArray(State[key])) {
      const items = State[key];
      State[key] = items.filter(
        (item) => item.id !== id);
    }
  }
}

