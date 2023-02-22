import { input } from "./input.mjs";
import { accordion } from "./accordion.mjs";

export async function accordionInput(
  bodyDiv,
  customType,
  key,
  value,
  id,
  parentId,
  valueDisabled
) {
  const headerContent = await input(
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );
  const bodyContent = await bodyDiv;

  const accordionInput = await accordion(
    headerContent,
    bodyContent,
    customType,
    key,
    value,
    id,
    parentId
  );

  return accordionInput;
}
