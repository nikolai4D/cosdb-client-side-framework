import { accordionInput } from "../types/accordionInput.mjs";
// import { Slot } from "./Slot.mjs";

export async function Slot(slot) {
  const SlotDiv = document.createElement("div");
  SlotDiv.classList.add(Slot.customType);

  const customType = slot.customType;
  const key = slot.key;
  const value = slot.value;
  const id = slot.id;
  const parentId = slot.parentId;
  const valueDisabled = slot.valueDisabled;

  const bodyDiv = document.createElement("div");
  const componentDiv = document.createElement("div"); //await Component(id);
  bodyDiv.appendChild(componentDiv);

  const SlotAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  SlotDiv.appendChild(SlotAccordionInput);

  return SlotDiv;
}
