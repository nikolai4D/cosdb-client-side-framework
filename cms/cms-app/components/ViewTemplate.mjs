import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { Slots } from "./Slots.mjs";

const viewTemps = ["", "viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function ViewTemplate(view) {
  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");

  const selectedValue = view.viewTemplate;
  const values = viewTemps;
  const key = "viewTemplate";
  const id = view.viewTemplateId;

  const bodyDiv = document.createElement("div");
  bodyDiv.appendChild(Slots(view.slots));

  const accordionDiv = accordionDropdown(
    bodyDiv,
    key,
    values,
    selectedValue,
    id,
    false
  );

  viewTemplateDiv.appendChild(accordionDiv);

  return viewTemplateDiv;
}
