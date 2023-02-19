import { createViewTemplate } from "./createViewTemplate.mjs";
import { accordionInput } from "../types/accordionInput.mjs";

export async function createViewDom(viewData) {
  const id = viewData.id;
  const key = "view";
  const value = viewData.view;
  const body = await createViewTemplate(id);
  const keyDisabled = false;

  return accordionInput(body, key, value, id, keyDisabled);
}
