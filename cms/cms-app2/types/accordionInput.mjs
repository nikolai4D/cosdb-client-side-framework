import { input } from "./input.mjs";
import { accordion } from "./accordion.mjs";

export async function accordionInput(body, key, value, id, keyDisabled) {
  const headerContent = input(key, value, id, keyDisabled);
  const bodyContent = await body;

  const accordionInput = await accordion(headerContent, bodyContent, id, key);

  return accordionInput;
}
