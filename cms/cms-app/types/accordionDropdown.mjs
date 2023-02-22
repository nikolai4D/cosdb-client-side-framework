import { dropdown } from "./dropdown.mjs";
import { accordion } from "./accordion.mjs";

export function accordionDropdown(
  bodyDiv,
  customType,
  key,
  values,
  selectedValue,
  id,
  parentId,
  valueDisabled
) {
  const headerContent = dropdown(
    customType,
    key,
    values,
    selectedValue,
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
    selectedValue,
    id,
    parentId
  );

  return accordionDropdown;
}
