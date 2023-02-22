import { Organism } from "./Organism.mjs";
import { newOrganism } from "./newOrganism.mjs";
import { Function } from "../_7_function/Function.mjs";
import { newFunction } from "../_7_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createOrganism(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "organisms";
  const organismBody = document.createElement("div");

  //--------------------------------

  //get subOrganisms

  const constructorTypeOrganisms = "organisms";

  const subOrganisms = await getConstructors(
    filename,
    constructorTypeOrganisms,
    type
    );

  if (subOrganisms) {
    await createSubcomponentsEl(
      subOrganisms,
      id,
      organismBody,
      componentBody
    );
  }

  //--------------------------------

  //get Molecules

  const constructorTypeMolecules = "molecules";

  const componentMolecules = await getConstructors(
    filename,
    constructorTypeMolecules,
    type
    );

  if (componentMolecules) {
    await createSubcomponentsEl(
      componentMolecules,
      id,
      organismBody,
      componentBody
    );
  }

  //--------------------------------

  // get Functions

  const constructorTypeFunctions = "functions";

  const componentFunctions = await getConstructors(
    filename,
    constructorTypeFunctions,
    type
  );

  console.log(constructorFunctions)

  if (componentFunctions) {
    await componentFunctions(
      componentMolecules,
      id,
      organismBody,
      componentBody
    );
  }

  // componentFunctions.forEach(async (fn) => {
  //   const [[key, value]] = Object.entries(fn);
  //   console.log({ key, value });
  // });

  //--------------------------------

  // const organismKey = key;
  // const organismValue = value;
  // const organismParentId = id;

  // const childSlot = await Organism(
  //   await newOrganism(organismKey, organismValue, organismParentId),
  //   organismBody
  // );

  // componentBody.appendChild(childSlot);
}

function createSubcomponentsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    console.log({ key, value });

    const organismKey = key;
    const organismValue = value;
    const organismParentId = id;

    let childSlot = await Organism(
      await newOrganism(organismKey, organismValue, organismParentId),
      compBody
    )

    parentBody.appendChild(childSlot);

  });
}

function createFunctionEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);
    console.log({ key, value });

    const organismKey = key;
    const organismValue = value;
    const organismParentId = id;

    let childSlot = await Function(
      await newFunction(organismKey, organismValue, organismParentId),
      compBody
    )

    parentBody.appendChild(childSlot);

  });
}


