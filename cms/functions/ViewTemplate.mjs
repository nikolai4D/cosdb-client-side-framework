// import { accordian } from "./types/accordian.mjs";
import { accordianDropdown } from "./types/accordianDropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Slots } from "./slots.mjs";
// import { dropdown } from "./types/dropdown.mjs";

const viewTemps = ["", "viewTemplate1", "viewTemplate2", "viewTemplate3"];

export function ViewTemplate(view) {
  const viewTemplateDiv = document.createElement("div");
  viewTemplateDiv.classList.add("viewTemplate");

  const selectedValue = view.viewTemplate;
  const values = viewTemps;
  const key = "viewTemplate";
  const id = view.viewTemplateId;

  const body = document.createElement("div");
  //   body.appendChild(document.createTextNode(`viewTemplate: `));
  //   body.appendChild(dropdown(viewTemps, view.viewTemplate));
  //   body.appendChild(document.createElement("br"));
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

  return viewTemplateDiv;
}
