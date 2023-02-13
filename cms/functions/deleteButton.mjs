import { writeModel } from "./writeModel.mjs";

export function deleteButton(input, label) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete?")) {
      label.remove();
      input.remove();
      deleteButton.remove();
      await writeModel();
      console.log("deleted");
    }
  });
}
