import { writeModel } from "./writeModel.mjs";
import { deleteButton } from "./deleteButton.mjs";

export function inputField(key, value, existingContentContainer) {
  const viewDiv = document.createElement("div");
  viewDiv.setAttribute("id", key);

  const label = document.createElement("label");
  label.textContent = key;
  label.setAttribute("id", key);
  viewDiv.appendChild(label);

  const input = document.createElement("input");
  input.setAttribute("id", key);
  input.setAttribute("value", value);
  input.addEventListener("change", writeModel);
  viewDiv.appendChild(input);

  const deleteButton = deleteButton(input, label);

  viewDiv.appendChild(deleteButton);

  existingContentContainer.appendChild(viewDiv);
}
