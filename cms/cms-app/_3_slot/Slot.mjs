import { accordionDropdown } from "../types/accordionDropdown.mjs";
// import { Slot } from "./Slot.mjs";

export async function Slot(slot) {
  const SlotDiv = document.createElement("div");
  SlotDiv.classList.add(Slot.customType);

  const customType = slot.customType;
  const key = slot.key;
  const values = slot.values;
  const selectedValue = slot.selectedValue;
  const id = slot.id;
  const parentId = slot.parentId;
  const valueDisabled = slot.valueDisabled;

  const bodyDiv = document.createElement("div");
  const componentDiv = document.createElement("div"); //await Component(id);
  bodyDiv.appendChild(componentDiv);

  const SlotAccordionDropdown = await accordionDropdown(
    bodyDiv,
    customType,
    key,
    values,
    selectedValue,
    id,
    parentId,
    valueDisabled
  );

  SlotDiv.appendChild(SlotAccordionDropdown);

  return SlotDiv;
}
