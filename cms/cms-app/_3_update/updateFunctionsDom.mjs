import { accordionInput } from "../types/accordionInput.mjs";
import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { dropdown } from "../types/dropdown.mjs";

// import { Organisms } from "./Organisms.mjs";
// import { Molecules } from "./Molecules.mjs";
// import { Atoms } from "./Atoms.mjs";

export async function updateFunctionsDom(functions, components) {
  const functionDiv = document.createElement("div");
  functionDiv.classList.add("functions");

  for await (const funcs of functions) {
    // Add if statement to check if function is an organism, molecule, or atom

    const key = funcs.function;
    console.log(funcs, "functs")
    // const value = function.function;
    const id = funcs.id;

  const selectedValue = null;
  const values = components;


  const dropdownDom = dropdown(key, values, selectedValue, id);
  

    functionDiv.appendChild(dropdownDom);
  }
  return functionDiv;
}
