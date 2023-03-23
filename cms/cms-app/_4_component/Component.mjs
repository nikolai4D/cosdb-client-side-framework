import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { componentValues } from "./componentValues.mjs";

export async function Component(component) {
  const ComponentDiv = document.createElement("div");
  ComponentDiv.classList.add(component.customType);

  const customType = component.customType;
  const key = component.key;
  const values = await componentValues();
  const value = component.value;
  const id = component.id;
  const parentId = component.parentId;
  const valueDisabled = component.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  bodyDiv.appendChild(contentDiv);

  const ComponentAccordionDropdown = await accordionDropdown(
    bodyDiv,
    customType,
    key,
    values,
    value,
    id,
    parentId,
    valueDisabled
  );

  ComponentDiv.appendChild(ComponentAccordionDropdown);
  return ComponentDiv;
}
