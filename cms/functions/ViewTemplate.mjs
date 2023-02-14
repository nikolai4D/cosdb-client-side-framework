import { accordian } from "./types/accordian.mjs";
import { Functions } from "./Functions.mjs";
import { Slots } from "./slots.mjs";
import { dropdown } from "./types/dropdown.mjs";

const viewTemps = ["", "viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function ViewTemplate(view) {
  const key = "viewTemplate";
  const value = view.viewTemplate;
  const body = document.createElement("div");
  body.appendChild(document.createTextNode(`viewTemplate: `));
  body.appendChild(dropdown(viewTemps, view.viewTemplate));
  body.appendChild(document.createElement("br"));
  body.appendChild(Slots(view.slots));

  const accordianDiv = accordian(key, value, body, true);
  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");
  viewTemplateDiv.appendChild(accordianDiv);

  return viewTemplateDiv;
}
