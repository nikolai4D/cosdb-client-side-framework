import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";

const viewTemplates = ["viewTemplate1","viewTemplate2","viewTemplate3"]

const key = "view",
const value = view.view,
const body = `viewTemplate: ${dropdown(viewTemplates, view.viewTemplate)}`


export function View(view) {
  return `   
      <div class="view">
          ${accordian(key, value, body)}
      </div>`;
}
