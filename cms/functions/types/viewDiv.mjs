import { View } from "../View.mjs";

export function ViewDiv(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const viewContent = View(view);
  viewDiv.appendChild(viewContent);

  return viewDiv;
}
