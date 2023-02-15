import { input } from "./input.mjs";
import { accordian } from "./accordian.mjs";

export function accordianInput(body, key, value, id, keyDisabled) {
  const headerContent = input(key, value, id, keyDisabled);
  const bodyContent = body;

  const accordianInput = accordian(headerContent, bodyContent);

  return accordianInput;
}
