import { accordianInput } from "./types/accordianInput.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";

export function View(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const key = "view";
  const value = view.view;
  const id = view.viewId;

  const bodyDiv = document.createElement("div");
  const viewTemplateDiv = ViewTemplate(view);
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordianInput = accordianInput(bodyDiv, key, value, id, false);
  viewDiv.appendChild(viewAccordianInput);

  return viewDiv;
}
