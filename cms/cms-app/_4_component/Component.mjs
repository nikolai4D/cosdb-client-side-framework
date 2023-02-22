import { accordionDropdown } from "../types/accordionDropdown.mjs";

export async function Component(component) {
  console.log("Component");
  const ComponentDiv = document.createElement("div");
  ComponentDiv.classList.add(Component.customType);

  const customType = Component.customType;
  const key = Component.key;
  const values = Component.values;
  const selectedValue = Component.selectedValue;
  const id = Component.id;
  const parentId = Component.parentId;
  const valueDisabled = Component.valueDisabled;

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
