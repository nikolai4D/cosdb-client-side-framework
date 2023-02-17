import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { Functions } from "./Functions.mjs";
import { Molecules } from "./Molecules.mjs";

const type = "organisms"

export async function Organisms(slot) {

  const components = (await readComponents(type).map(component => component.name))
  console.log(components)

  const organismsDiv = document.createElement("div");
  organismsDiv.classList.add("organisms");

  //add if statement to check if slot is slot or organism
  const key = "organism";
  const value = slot.organism;
  const organismId = slot.organismId;
  const bodyDiv = document.createElement("div");

  const functionsEl = Functions(slot.functions);
  const moleculesEl = Molecules(slot.molecules);

  bodyDiv.appendChild(functionsEl);
  bodyDiv.appendChild(moleculesEl);

  organismsDiv.appendChild(
    accordionDropdown(bodyDiv, key, components, value, organismId, false)
  );

  return organismsDiv;
}
