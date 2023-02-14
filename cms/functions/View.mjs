import { accordian } from "./types/accordian.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";

export function View(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const key = "view";
  const value = view.view;
  const id = view.viewId;

  const viewTemplateDiv = ViewTemplate(view);
  const bodyDiv = document.createElement("div");
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordian = accordian(key, value, bodyDiv, false, id);
  viewDiv.appendChild(viewAccordian);

  return viewDiv;
}
