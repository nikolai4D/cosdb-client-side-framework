import { dropdown } from "../types/dropdown.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Function(func, functionBody) {
  const functionDiv = document.createElement("div");
  functionDiv.classList.add(func.customType);

  const customType = func.customType;
  const key = func.key;
  const values = func.values;
  const selectedValue = func.selectedValue;
  const id = func.id;
  const parentId = func.parentId;
  const valueDisabled = func.valueDisabled;

  const bodyDiv = document.createElement("div");
  const contenDiv = await functionBody;
  bodyDiv.appendChild(contenDiv);

  const functionDropdown = dropdown(
    customType,
    key,
    values,
    selectedValue,
    id,
    parentId,
    valueDisabled
  );

  functionDiv.appendChild(functionDropdown);

  await mutation_updateState("functions", func);

  return functionDiv;
}
