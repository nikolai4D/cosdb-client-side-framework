import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";

const viewTemplates = ["viewTemplate1","viewTemplate2","viewTemplate3"]

export function View(view) {

    console.log(view,"view"")

    const key = "view",
    const value = view.view,
    const body = `viewTemplate: ${dropdown(viewTemplates, view.viewTemplate)}`


  return `   
      <div class="view">
          ${accordian(key, value, body)}
      </div>`;
}
