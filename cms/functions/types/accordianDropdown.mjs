import { dropdown } from "./dropdown.mjs";
import { accordian } from "./accordian.mjs";

export function accordianDropdown(
  body,
  key,
  values,
  selectedValue,
  id,
  keyDisabled
) {
  const headerContent = dropdown(key, values, selectedValue, id, keyDisabled);
  const bodyContent = body;

  const accordianDropdown = accordian(headerContent, bodyContent, id);

  return accordianDropdown;
}
