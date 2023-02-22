import { input } from "./input.mjs";
import { accordion } from "./accordion.mjs";

export async function accordionInput(
  body,
  customType,
  key,
  value,
  id,
  parentId,
  valueDisabled
) {
  const headerContent = input(
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );
  const bodyContent = await body;

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
