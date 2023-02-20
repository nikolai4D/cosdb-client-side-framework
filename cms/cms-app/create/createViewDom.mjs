import { createViewTemplate } from "./createViewTemplate.mjs";
import { accordionInput } from "../types/accordionInput.mjs";

export async function createViewDom(viewData, body) {
  const id = viewData.id;
  const key = "view";
  const value = viewData.view;
  const body = body;
  const keyDisabled = false;

  return accordionInput(body, key, value, id, keyDisabled);
}
