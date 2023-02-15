import { accordianDropdown } from "./types/accordianDropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";
// import { dropdown } from "./types/dropdown.mjs";

const orgs = ["organism1", "organism2", "organism3"];

export function Organisms(slot) {
  const organismsDiv = document.createElement("div");
  organismsDiv.classList.add("organisms");

  const key = "organism";
  const value = slot.organism;
  //   const slotId = slot.organismId;
  const organismId = slot.organismId;

  const bodyDiv = document.createElement("div");
  //   const dropdownEl = dropdown(orgs, value, slotId);
  const functionsEl = Functions(slot.functions);
  const moleculesEl = Molecules(slot.molecules);

  //   bodyDiv.appendChild(document.createTextNode("organism: "));
  //   bodyDiv.appendChild(dropdownEl);
  bodyDiv.appendChild(document.createElement("br"));
  bodyDiv.appendChild(functionsEl);
  bodyDiv.appendChild(document.createElement("br"));
  bodyDiv.appendChild(moleculesEl);

  organismsDiv.appendChild(
    accordianDropdown(bodyDiv, key, orgs, value, organismId, true)
  );

  //   organismsDiv.appendChild(document.createElement("br"));

  return organismsDiv;
}
