import { dropdown } from "../types/dropdown.mjs";
import { functionValues } from "./functionValues.mjs";
import { input } from "../types/input.mjs";

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

  const parametersCustomType = "functionParameters";
  const parametersKey = "parameters";
  const parametersValue = func.parameters;
  const parametersValueDisabled = false;
  const parametersId = id + "parameters";
  const parametersParentId = id;

  const functionParameters = await input(
    parametersCustomType,
    parametersKey,
    parametersValue,
    parametersId,
    parametersParentId,
    parametersValueDisabled
  );

  functionDiv.appendChild(functionParameters);

  return functionDiv;
}
