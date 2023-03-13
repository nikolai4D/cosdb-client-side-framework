import { accordionInput } from "../types/accordionInput.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Molecule(molecule, moleculeBody) {
  console.log("Molecule");
  const moleculeDiv = document.createElement("div");
  moleculeDiv.classList.add(molecule.customType);

  const customType = molecule.customType;
  const key = molecule.key;
  const value = molecule.value;
  const id = molecule.id;
  const parentId = molecule.parentId;
  const valueDisabled = molecule.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await moleculeBody;
  bodyDiv.appendChild(contenDiv);

  const moleculeAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,

    id,
    parentId,
    valueDisabled
  );

  moleculeDiv.appendChild(moleculeAccordionInput);

  console.log(id, value, parentId, "molecules");

  await mutation_updateState("molecules", molecule);

  return moleculeDiv;
}
