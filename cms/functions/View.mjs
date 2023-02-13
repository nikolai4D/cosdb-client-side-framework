import { accordian } from "./types/accordian.mjs";

export function View(view) {
  const body = {
    viewTemplate: view.viewTemplate,
    slots: view.slots,
  };

  console.log("body: ", body);

  return `   
      <div class="view">
          ${accordian("view", view, body)}
      </div>`;
}
