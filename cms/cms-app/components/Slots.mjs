import { accordionInput } from "../types/accordionInput.mjs";
import { Organisms } from "./Organisms.mjs";
// import { Molecules } from "./Molecules.mjs";
// import { Atoms } from "./Atoms.mjs";

export async function Slots(slots) {
  const slotDiv = document.createElement("div");
  slotDiv.classList.add("slots");

  for await (const slot of slots) {
    // Add if statement to check if slot is an organism, molecule, or atom

    const key = "slot";
    const value = slot.slot;
    const id = slot.slotId;

    const bodyDiv = document.createElement("div");
    bodyDiv.appendChild(await Organisms(slot));

    const accordionDiv = accordionInput(bodyDiv, key, value, id, true);
    slotDiv.appendChild(accordionDiv);
  }
  return slotDiv;
}
