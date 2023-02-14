import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { Organisms } from "./Organisms.mjs";

export function Slots(slots) {
  let slotsHtml = "";

  for (const slot of slots) {
    const key = "slot";
    const value = slot.slot;
    const body = `${Organisms(slot)}`;

    slotsHtml += `${accordian(key, value, body, true)} <br>`;
  }

  return `   
      <div class="slots">
        ${slotsHtml}
      </div>
    `;
}
