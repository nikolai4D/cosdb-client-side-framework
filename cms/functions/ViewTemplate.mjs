import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Slots } from "./slots.mjs";
import { dropdown } from "./types/dropdown.mjs";

const viewTemps = ["viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function ViewTemplate(view) {
  let viewTemplateHtml = "";

  const body = `viewTemplate: ${dropdown(viewTemps, view.viewTemplate)}<br>
    ${Slots(view.slots)}`;
  viewTemplateHtml += `${accordian(
    "viewTemplate",
    view.viewTemplate,
    body,
    true
  )} <br>`;

  return `   
    <div class="viewTemplate">
      ${viewTemplateHtml}
    </div>
  `;
}
