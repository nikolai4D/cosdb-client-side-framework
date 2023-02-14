import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";
import { dropdown } from "./types/dropdown.mjs";

const orgs = ["organism1", "organism2", "organism3"];

export function Organisms(slot) {
  let organismsHtml = "";

  const body = `organism: ${dropdown(orgs, slot.organism)}<br>
    ${Functions(slot.functions)}<br>
    ${Molecules(slot.molecules)}`;
  organismsHtml += `${accordian("organism", slot.organism, body)} <br>`;

  return `   
    <div class="organisms">
      ${organismsHtml}
    </div>
  `;
}
