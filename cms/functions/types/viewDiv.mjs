import { View } from "../View.mjs";

export function ViewDiv(view) {
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "x";
  deleteButton.onclick = () => {
    if (confirm("Are you sure you want to delete this view?")) {
      viewDiv.remove();
    }
  };
  viewDiv.appendChild(deleteButton);
  const viewContent = View(view);
  viewDiv.appendChild(viewContent);

  return viewDiv;
}
