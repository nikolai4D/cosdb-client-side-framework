import { dropdown } from "./dropdown.mjs";
import { accordion } from "./accordion.mjs";

export function accordionDropdown(
  bodyDiv,
  customType,
  key,
  values,
  value,
  id,
  parentId,
  valueDisabled
) {
  const headerContent = dropdown(
    customType,
    key,
    values,
    value,
    id,
    parentId,
    valueDisabled
  );
  const bodyContent = bodyDiv;

  const accordionDropdown = accordion(
    headerContent,
    bodyContent,
    customType,
    key,
    value,
    id,
    parentId
  );

  return accordionDropdown;
}
