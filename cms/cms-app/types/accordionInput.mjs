import { input } from "./input.mjs";
import { accordion } from "./accordion.mjs";

export async function accordionInput(
  bodyDiv,
  customType,
  key,
  value,
  id,
  parentId,
  valueDisabled,
  protectedView = false
) {
console.log("protectedView", protectedView")
  const headerContent = await input(
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled,
    protectedView = false
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
