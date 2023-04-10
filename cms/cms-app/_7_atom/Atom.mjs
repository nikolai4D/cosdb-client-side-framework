import { accordionInput } from "../types/accordionInput.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Atom(atom, atomBody) {
  const atomDiv = document.createElement("div");
  atomDiv.classList.add(atom.customType);

  const customType = atom.customType;
  const key = atom.key;
  const value = atom.value;
  const id = atom.id;
  const parentId = atom.parentId;
  const valueDisabled = atom.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await atomBody;
  bodyDiv.appendChild(contenDiv);

  const atomAccordionInput = await accordionInput(
    bodyDiv,
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  atomDiv.appendChild(atomAccordionInput);

  await mutation_updateState("atoms", atom);

  return atomDiv;
}
