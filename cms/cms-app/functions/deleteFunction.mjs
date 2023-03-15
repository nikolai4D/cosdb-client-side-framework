import { State } from "../data-mgmt/State.mjs";

export async function deleteFunction(id) {
  // Remove view with specified id
  State.functions = State.functions.filter((fn) => fn.id !== id);
}
