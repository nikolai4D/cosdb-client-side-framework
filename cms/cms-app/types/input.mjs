import { eventChangeInput } from "../functions/eventChangeInput.mjs";

export async function input(
  customType,
  key,
  value,
  id,
  parentId,
  valueDisabled = false
) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ": ";

  const inputEl = document.createElement("input");
  inputEl.value = value;
  inputEl.disabled = valueDisabled;
  inputEl.id = id;
  inputEl.setAttribute("parentId", parentId);
  inputEl.setAttribute("customType", customType);
  inputEl.addEventListener("change", () => eventChangeInput(id, inputEl.value));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  return container;
}
