import { Organism } from "./Organism.mjs";
import { newOrganism } from "./newOrganism.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createOrganism(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "organisms";

  const organismBody = document.createElement("div");
  //--------------------------------

  //get subOrganisms
  const constructorTypeOrganisms = "organisms";
  const componentOrganisms = await getConstructors(
    filename,
    constructorTypeOrganisms,
    type
  );
  
  if (componentOrganisms){
    componentOrganisms.forEach(async (organism) => {
      const [[key, value]] = Object.entries(organism);
      console.log({ key, value });

      // const subOrganism = await Organism(componentBody, id, selectedValue);

      const organismKey = key;
      const organismValue = value;
      const organismParentId = id;
    
      const childSlot = await Organism(
        await newOrganism(organismKey, organismValue, organismParentId),
        organismBody
      );
    
      componentBody.appendChild(childSlot);
    });

}

  //--------------------------------

  // //get Molecules
  const constructorTypeMolecules = "molecules";
  const componentMolecules = await getConstructors(
    filename,
    constructorTypeMolecules,
    type
  );
  if (componentMolecules){

  componentMolecules.forEach(async (molecule) => {
    const [[key, value]] = Object.entries(molecule);
    console.log({ key, value });

    const organismKey = key;
    const organismValue = value;
    const organismParentId = id;
  
    const childSlot = await Organism(
      await newOrganism(organismKey, organismValue, organismParentId),
      organismBody
    );
  
    componentBody.appendChild(childSlot);
    
  });
  }
  // //--------------------------------

  // //get Functions
  // const constructorTypeFunctions = "functions";
  // const componentFunctions = await getConstructors(
  //   filename,
  //   constructorTypeFunctions,
  //   type
  // );
  // componentFunctions.forEach(async (fn) => {
  //   const [[key, value]] = Object.entries(fn);
  //   console.log({ key, value });
  // });

  // //--------------------------------

  // const organismKey = key;
  // const organismValue = value;
  // const organismParentId = id;

  // const childSlot = await Organism(
  //   await newOrganism(organismKey, organismValue, organismParentId),
  //   organismBody
  // );

  // componentBody.appendChild(childSlot);
}
