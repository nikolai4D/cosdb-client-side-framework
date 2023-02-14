import { accordian } from "./types/accordian.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";

export function View(view) {
  const key = "view";
  const value = view.view;
  const body = `${ViewTemplate(view)}`;

  return `   
      <div class="view">
          ${accordian(key, value, body)}
      </div>`;
}
