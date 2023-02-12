import { handleSave } from "./handleSave.mjs";

export async function dataContent(contentContainer, data) {
  for (const key in data) {
    const label = document.createElement("label");
    label.textContent = key;
    contentContainer.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("id", key);
    input.setAttribute("value", data[key]);
    input.addEventListener("change", handleSave);
    contentContainer.appendChild(input);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this input?")) {
        label.remove();
        input.remove();
        deleteButton.remove();

        handleSave();

        console.log("deleted from dataContent");
      }
    });
    contentContainer.appendChild(deleteButton);

    const br = document.createElement("br");
    contentContainer.appendChild(br);
  }
}
