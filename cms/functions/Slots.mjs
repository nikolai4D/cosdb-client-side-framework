import { accordian } from "./types/accordian.mjs";
import { Organisms } from "./Organisms.mjs";

export function Slots(slots) {
  const slotDiv = document.createElement("div");
  slotDiv.classList.add("slots");

  for (const slot of slots) {
    const key = "slot";
    const value = slot.slot;
    const id = slot.slotId;

    const body = Organisms(slot);

    const accordionDiv = accordian(key, value, body, true, id);
    slotDiv.appendChild(accordionDiv);
  }

  return slotDiv;
}
