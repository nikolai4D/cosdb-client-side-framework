import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { Organisms } from "./Organisms.mjs";

export function Slots(slots) {
  let slotsHtml = "";

  for (const slot of slots) {
    const body = `${Organisms(slot)}`;

    slotsHtml += `${accordian("slot", slot.slot, body, true)} <br>`;
  }

  return `   
      <div class="slots">
        ${slotsHtml}
      </div>
    `;
}
