import { writeModel } from "./writeModel.mjs";

export function inputField(key, value, existingContentContainer) {
  const label = document.createElement("label");
  label.textContent = key;
  label.setAttribute("id", key);
  existingContentContainer.appendChild(label);

  const input = document.createElement("input");
  input.setAttribute("id", key);
  input.setAttribute("value", value);
  input.addEventListener("change", writeModel);
  existingContentContainer.appendChild(input);
}
