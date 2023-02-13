import { writeModel } from "./requests/writeModel.mjs";

export function deleteButton(viewDiv, input, label) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete?")) {
      label.remove();
      input.remove();
      viewDiv.remove();
      deleteButton.remove();
      await writeModel();
      console.log("deleted");
    }
  });
  return deleteButton;
}
