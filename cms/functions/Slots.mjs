import { accordionInput } from "./accordionInput.mjs";

import { Organisms } from "./Organisms.mjs";

export function Slots(slots) {
  const slotDiv = document.createElement("div");
  slotDiv.classList.add("slots");

  for (const slot of slots) {
    const key = "slot";
    const value = slot.slot;
    const id = slot.slotId;

    const bodyDiv = document.createElement("div");
    bodyDiv.appendChild(Organisms(slot));

    const accordionDiv = accordionInput(bodyDiv, key, value, id, true);
    slotDiv.appendChild(accordionDiv);
  }
  return slotDiv;
}
