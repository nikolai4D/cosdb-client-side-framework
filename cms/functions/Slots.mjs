import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";

const organisms = ["organism1", "organism2", "organism3"];

export function Slots(slots) {
  let slotsHtml = "";

  for (const slot of slots) {
    const organism = `organism: ${dropdown(organisms, slot.organism)}`;
    slotsHtml += `${accordian("slot", slot.slot, organism, true)} <br>`;
  }

  return `   
    <div class="slots">
      ${slotsHtml}
    </div>
  `;
}
