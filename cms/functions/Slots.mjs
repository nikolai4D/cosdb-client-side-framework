import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { Functions } from "./Functions.mjs";

const organisms = ["organism1", "organism2", "organism3"];
const functions = ["function1", "function2", "function3"];

export function Slots(slots) {
  let slotsHtml = "";

  for (const slot of slots) {
    const body = `organism: ${dropdown(organisms, slot.organism)}<br>
    functions: ${Functions(slot.functions)}<br>
    molecules: MOLECULES`;
    slotsHtml += `${accordian("slot", slot.slot, body, true)} <br>`;
  }

  return `   
    <div class="slots">
      ${slotsHtml}
    </div>
  `;
}
