import { Atom } from "../_7_atom/Atom.mjs";
import { newAtom } from "../_7_atom/newAtom.mjs";
import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";

export async function createAtom(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "atoms";
  const organismBody = document.createElement("div");


  //--------------------------------

    //get Atoms

  const constructorTypeAtoms = "options";

  const componentAtoms = await getConstructors(
    filename,
    constructorTypeAtoms,
    type
    );
console.log(componentAtoms)
  if (componentAtoms) {
    // await createSubAtomsEl(
    //   componentAtoms,
    //   id,
    //   organismBody,
    //   componentBody
    // );
  }


  //--------------------------------

  // get Functions

//   const constructorTypeFunctions = "functions";

//   const componentFunctions = await getConstructors(
//     filename,
//     constructorTypeFunctions,
//     type
//   );

//   if (componentFunctions) {
//     await createFunctionsEl(
//       componentFunctions,
//       id,
//       organismBody,
//       componentBody
//     );
//   }
}


function createSubAtomsEl(subComps, id, compBody, parentBody) {
    subComps.forEach(async (comp) => {
      const [[key, value]] = Object.entries(comp);
  
      const organismKey = key;
      const organismValue = value;
      const organismParentId = id;
  
      let childSlot = await Atom(
        await newAtom(organismKey, organismValue, organismParentId),
        compBody
      )
  
      parentBody.appendChild(childSlot);
  
    });
  }

function createFunctionsEl(subComps, id, compBody, parentBody) {
  subComps.forEach(async (comp) => {
    const [[key, value]] = Object.entries(comp);

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


