import { accordionInput } from "../types/accordionInput.mjs";
import { accordionDropdown } from "../types/accordionDropdown.mjs";
import { updateSubcomponentData } from "./updateSubcomponentData.mjs";
// import { Organisms } from "./Organisms.mjs";
// import { Molecules } from "./Molecules.mjs";
// import { Atoms } from "./Atoms.mjs";

export async function updateSubcomponentDom(subComponents, components) {
  const subComponentDiv = document.createElement("div");
  subComponentDiv.classList.add("subComponents");


//   updateSubcomponentData()
  for await (const subComponent of subComponents) {
    // Add if statement to check if subComponent is an organism, molecule, or atom

    const key = "Subcomponent";
    // const value = subComponent.subComponent;
    const id = subComponent.id;

    const bodyDiv = document.createElement("div");
;


//   const accordionDiv = await accordionDropdown(
//     bodyDiv,
//     key,
//     values,
//     selectedValue,
//     id,
//     false
//   );
    let value = subComponent.subComponent;
    let keyDisabled = true;

    let functions = await getConstructors(value, "functions",newValue.split("_")[0].toLowerCase()+"s");
    console.log("functions", functions)")
    const accordionDiv =  await accordionInput(bodyDiv, key, value, id, keyDisabled) 

    subComponentDiv.appendChild(accordionDiv);
    

  
    // bodyDiv.appendChild(await Organisms(subComponent));

    // const accordionDiv = await accordionInput(bodyDiv, key, value, id, true);
  }
  return subComponentDiv;
}
