import { accordionDropdown } from "../types/accordionDropdown.mjs";

export async function Component(component) {
  console.log("Component");
  const ComponentDiv = document.createElement("div");
  ComponentDiv.classList.add(Component.customType);

  const customType = component.customType;
  const key = component.key;
  const values = component.values;
  const selectedValue = component.selectedValue;
  const id = component.id;
  const parentId = component.parentId;
  const valueDisabled = component.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contentDiv = document.createElement("div"); //await ?;
  bodyDiv.appendChild(contentDiv);

  const ComponentAccordionDropdown = await accordionDropdown(
    bodyDiv,
    customType,
    key,
    values,
    selectedValue,
    id,
    parentId,
    valueDisabled
  );

  ComponentDiv.appendChild(ComponentAccordionDropdown);

  return ComponentDiv;
}
