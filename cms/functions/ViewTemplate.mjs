import { accordianDropdown } from "./types/accordianDropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Slots } from "./slots.mjs";

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

  const accordianDiv = accordianDropdown(
    bodyDiv,
    key,
    values,
    selectedValue,
    id,
    false
  );

  viewTemplateDiv.appendChild(accordianDiv);

  return viewTemplateDiv;
}
