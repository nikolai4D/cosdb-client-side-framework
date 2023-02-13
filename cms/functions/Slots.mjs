import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./molecule.mjs";

const organisms = ["organism1", "organism2", "organism3"];

export function Slots(slots) {
  let slotsHtml = "";

  for (const slot of slots) {
    const body = `organism: ${dropdown(organisms, slot.organism)}<br>
    ${Functions(slot.functions)}<br>
    ${Molecules(slot.molecules)}`;
    slotsHtml += `${accordian("slot", slot.slot, body, true)} <br>`;
  }

  return `   
    <div class="slots">
      ${slotsHtml}
    </div>
  `;
}
