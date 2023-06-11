import { dropdown } from "../types/dropdown.mjs";
import { functionValues } from "./functionValues.mjs";
import { input } from "../types/input.mjs";
import { mutation_updateState } from "../data-mgmt/mutations/mutation_updateState.mjs";

export async function Function(func, functionBody) {
  console.log("func",func)
  const functionDiv = document.createElement("div");
  functionDiv.classList.add(func.customType);

  const customType = func.customType;
  const key = func.key;
  //const values = await functionValues();
  const value = func.value;
  const id = func.id;
  const parentId = func.parentId;
  const valueDisabled = func.valueDisabled;
  const parameters = func.parameters;

  const functionInput = await input(
    customType,
    key,
    value,
    id,
    parentId,
    valueDisabled
  );

  functionDiv.appendChild(functionInput);

  const parametersCustomType = "functionParameters";
  const parametersKey = "parameters";

  const parametersValue = parameters;
  let parametersValueDisabled;
  if (value !== "") {
    parametersValueDisabled = false;
  } else {
    parametersValueDisabled = true;
  }

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

  await mutation_updateState("functions", func);

  return functionDiv;
}
