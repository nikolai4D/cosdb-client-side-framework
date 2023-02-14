import { accordian } from "./types/accordian.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";

export function View(view) {

    console.log(view, "view!!!!!!")

    let viewHtml = "";

  const key = "view";
  const value = view.view;
  const body = `${ViewTemplate(view)}`;

  viewHtml = ${accordian(key, value, body)}

  return `   
      <div class="view">
          ${viewHtml}
      </div>`;
}
