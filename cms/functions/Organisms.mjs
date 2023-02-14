import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";

const orgs = ["organism1", "organism2", "organism3"];

export function Organisms(organisms) {
  let organismsHtml = "";

  for (const org of organisms) {
    const body = `organism: ${dropdown(orgs, org.organism)}<br>
    ${Functions(org.functions)}<br>
    ${Molecules(org.molecules)}`;
    organismsHtml += `${accordian("organism", org.organism, body, true)} <br>`;
  }

  return `   
    <div class="organisms">
      ${organismsHtml}
    </div>
  `;
}
