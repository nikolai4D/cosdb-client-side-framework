import { writeModel } from "./requests/writeModel.mjs";

export function input(key, value) {
  const label = document.createElement("label");
  label.textContent = key;

  const input = document.createElement("input");
  input.setAttribute("value", value);
  input.addEventListener("change", writeModel);

  return { label, input };
}
