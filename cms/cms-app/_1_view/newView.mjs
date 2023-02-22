import { getUuid } from "../requests/getUuid.mjs";

export async function newView() {
  const view = {};

  view.customType = "view";
  view.key = customType;
  view.value = "New View";
  view.id = await getUuid();
  view.parentId = view.id;
  view.valueDisabled = false;

  return view;
}
