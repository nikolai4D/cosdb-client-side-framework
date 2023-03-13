import { State } from "../data-mgmt/State.mjs";

export async function deleteView(id) {
  // Remove view with specified id
  State.views = State.views.filter((view) => view.id !== id);
}
