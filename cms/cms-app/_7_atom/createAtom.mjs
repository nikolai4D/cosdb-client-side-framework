import { Atom } from "../_7_atom/Atom.mjs";
import { newAtom } from "../_7_atom/newAtom.mjs";
import { Function } from "../_8_function/Function.mjs";
import { newFunction } from "../_8_function/newFunction.mjs";
import { getConstructors } from "../functions/getConstructors.mjs";
import { input } from "../types/input.mjs";

export async function createAtom(componentBody, id, selectedValue) {
  const filename = selectedValue;
  const type = "atoms";
  const organismBody = document.createElement("div");


  //--------------------------------

    //get Atoms

  const constructorTypeAtoms = "valueOptions";

  const componentAtoms = await getConstructors(
    filename,
    constructorTypeAtoms,
    type
    );
// console.log(componentAtoms, "HELLO")
  if (componentAtoms) {

    //  await input(
    //     customType,
    //     key,
    //     value,
    //     id,
    //     parentId,
    //     valueDisabled=false,
    //   );

    await createSubAtomsEl(
      componentAtoms,
      id,
      organismBody,
      componentBody
    );
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
  
      const customType = "valueOptions"
      const organismKey = key;
      const organismValue = value;
      const organismParentId = id;
  
         let childSlot = await input(
        customType,
        key,
        value,
        id,
        organismParentId,
        false,
      );

    //   let childSlot = await Atom(
    //     await newAtom(organismKey, organismValue, organismParentId),
    //     compBody
    //   )

  
      parentBody.appendChild(childSlot);
    //   let slotEls = childSlot.getElementsByTagName("input")
    //   let newId = slotEls[0].id
    //   let nextLevelBody = document.getElementById("accordion-body-"+newId)
  
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


