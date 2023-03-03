import { accordionInput } from "../types/accordionInput.mjs";

export async function createViewDom(viewData, viewTemplateDom) {
  const id = viewData.id;
  const key = "view";
  const value = viewData.view;
  const body = viewTemplateDom;
  const keyDisabled = false;

  return accordionInput(body, key, value, id, keyDisabled);
}
