import { dropdown } from "./dropdown.mjs";
import { accordion } from "../../config/accordion.mjs";

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

  const accordionDropdown = accordion(headerContent, bodyContent, id);

  return accordionDropdown;
}
