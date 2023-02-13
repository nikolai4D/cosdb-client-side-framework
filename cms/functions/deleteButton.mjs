import { writeModel } from "./writeModel.mjs";

export function deleteButton(key, existingContentContainer) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete?")) {
      const label = document.getElementById(key);
      label.remove();
      const input = document.getElementById(key);
      input.remove();
      deleteButton.remove();
      await writeModel();
      console.log("deleted");
    }
  });
  existingContentContainer.appendChild(deleteButton);
}
