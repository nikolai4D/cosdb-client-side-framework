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

  const body = document.createElement("div");
  body.appendChild(Slots(view.slots));

  const accordianDiv = accordianDropdown(
    body,
    key,
    values,
    selectedValue,
    id,
    false
  );

  viewTemplateDiv.appendChild(accordianDiv);
  viewTemplateDiv.addEventListener("change", () => deleteChildNodes(id));

  return viewTemplateDiv;
}

function deleteChildNodes(id) {
  const node = document.getElementById(id);
  const parent = node;
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
