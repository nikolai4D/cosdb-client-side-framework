import { accordian } from "./types/accordian.mjs";
import { Organisms } from "./Organisms.mjs";

export function Slots(slots) {
  const slotDiv = document.createElement("div");
  slotDiv.classList.add("slots");

  for (const slot of slots) {
    const key = "slot";
    const value = slot.slot;
    const body = Organisms(slot);

    const accordionDiv = accordian(key, value, body, true);
    slotDiv.appendChild(accordionDiv);
  }

  return slotDiv;
}
