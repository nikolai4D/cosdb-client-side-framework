import { getUuid } from "../requests/getUuid.mjs";

export async function newView() {
  const view = {};

  view.customType = "view";
  view.key = view.customType;
  view.value = "New View";
  view.id = await getUuid();
  view.parentId = view.id;
  view.valueDisabled = false;
  view.protected = true;
  view.startView = false;

  return view;
}
