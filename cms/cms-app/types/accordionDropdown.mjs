import { dropdown } from "./dropdown.mjs";
import { accordion } from "./accordion.mjs";

export function accordionDropdown(
  body,
  key,
  values,
  selectedValue,
  id,
  keyDisabled
) {
  const headerContent = dropdown(key, values, selectedValue, id, keyDisabled);
  const bodyContent = body;

  const accordionDropdown = accordion(headerContent, bodyContent, id, key);

  return accordionDropdown;
}
