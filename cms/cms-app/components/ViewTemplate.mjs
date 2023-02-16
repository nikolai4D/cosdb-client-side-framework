import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";

const viewTempls = ["viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function ViewTemplate(viewTemplate) {
  let viewTemplateHtml = "";

  for (const org of viewTemplate) {
    const body = `organism: ${dropdown(orgs, org.organism)}<br>
    ${Functions(org.functions)}<br>
    ${Molecules(org.molecules)}`;
    viewTemplateHtml += `${accordian(
      "organism",
      org.organism,
      body,
      true
    )} <br>`;
  }

  return `   
    <div class="viewTemplate">
      ${viewTemplateHtml}
    </div>
  `;
}
