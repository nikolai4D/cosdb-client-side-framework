import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";
import { ViewTemplate } from "./slots.mjs";

const viewTemplates = ["viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function View(view) {
  const key = "view";
  const value = view.view;
  const body = `${ViewTemplate(view)}`;

  return `   
      <div class="view">
          ${accordian(key, value, body)}
      </div>`;
}
