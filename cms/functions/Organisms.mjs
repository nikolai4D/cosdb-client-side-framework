import { accordionDropdown } from "./types/accordionDropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";

const orgs = ["organism1", "organism2", "organism3"];

export function Organisms(slot) {
  const organismsDiv = document.createElement("div");
  organismsDiv.classList.add("organisms");

  const key = "organism";
  const value = slot.organism;
  const organismId = slot.organismId;
  const bodyDiv = document.createElement("div");

  const functionsEl = Functions(slot.functions);
  const moleculesEl = Molecules(slot.molecules);

  bodyDiv.appendChild(functionsEl);
  bodyDiv.appendChild(moleculesEl);

  organismsDiv.appendChild(
    accordionDropdown(bodyDiv, key, orgs, value, organismId, false)
  );

  return organismsDiv;
}
