import { accordionInput } from "../types/accordionInput.mjs";
import { accordionDropdown } from "../types/accordionDropdown.mjs";

// import { Organisms } from "./Organisms.mjs";
// import { Molecules } from "./Molecules.mjs";
// import { Atoms } from "./Atoms.mjs";

export async function updateConstructorDom(functions, components) {
  const slotDiv = document.createElement("div");
  slotDiv.classList.add("functions");

  for await (const funcs of functions) {
    // Add if statement to check if slot is an organism, molecule, or atom

    const key = funcs.function;
    // const value = slot.slot;
    const id = funcs.id;

    const bodyDiv = document.createElement("div");

  const selectedValue = null;
  const values = components;


  const accordionDiv = await accordionDropdown(
    bodyDiv,
    key,
    values,
    selectedValue,
    id,
    false
  );


  
    // bodyDiv.appendChild(await Organisms(slot));

    // const accordionDiv = await accordionInput(bodyDiv, key, value, id, true);
    slotDiv.appendChild(accordionDiv);
  }
  return slotDiv;
}
