import { input } from "./input.mjs";
import { accordion } from "../../config/accordion.mjs";

export function accordionInput(body, key, value, id, keyDisabled) {
  const headerContent = input(key, value, id, keyDisabled);
  const bodyContent = body;

  const accordionInput = accordion(headerContent, bodyContent, id);

  return accordionInput;
}
