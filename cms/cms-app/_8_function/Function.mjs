import { dropdown } from "../types/dropdown.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";
import { functionValues } from "./functionValues.mjs";

export async function Function(func, functionBody) {
  const functionDiv = document.createElement("div");
  functionDiv.classList.add(func.customType);

  const customType = func.customType;
  const key = func.key;
  const values = await functionValues();
  const value = func.value;
  const id = func.id;
  const parentId = func.parentId;
  const valueDisabled = func.valueDisabled;

  const functionDropdown = dropdown(
    customType,
    key,
    values,
    value,
    id,
    parentId,
    valueDisabled
  );

  functionDiv.appendChild(functionDropdown);

  //await mutation_updateState("functions", func);

  return functionDiv;
}
