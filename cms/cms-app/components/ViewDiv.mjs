import { View } from "./View.mjs";

export async function ViewDiv(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  const viewContent = await View(view);
  viewDiv.appendChild(viewContent);

  return viewDiv;
}
