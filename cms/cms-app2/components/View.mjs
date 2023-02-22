import { accordionInput } from "../types/accordionInput.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";

export async function View(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const key = "view";
  const value = view.view;
  const id = view.viewId;

  const bodyDiv = document.createElement("div");
  const viewTemplateDiv = await ViewTemplate(view);
  bodyDiv.appendChild(viewTemplateDiv);

  const viewAccordionInput = accordionInput(bodyDiv, key, value, id, false);
  viewDiv.appendChild(viewAccordionInput);

  return viewDiv;
}
