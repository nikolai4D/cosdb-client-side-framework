// import { accordionInput } from "../types/accordionInput.mjs";
// import { Component } from "../_4_component/Component.mjs";
// import { newComponent } from "../_4_component/newComponent.mjs";
// import { Slot } from "./Slot.mjs";
import { dropdown } from "../types/dropdown.mjs";

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

//   const functionDropdown = dropdown(key, values, selectedValue, id, false, "function");

  functionDiv.appendChild(functionDropdown);

  return functionDiv;
}
