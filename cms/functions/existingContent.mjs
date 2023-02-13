import { writeModel } from "./writeModel.mjs";
import { inputField } from "./inputField.mjs";
import { deleteButton } from "./deleteButton.mjs";

export async function existingContent(existingContentContainer, data) {
  for (const key in data) {
    // const label = document.createElement("label");
    // label.textContent = key;
    // existingContentContainer.appendChild(label);

    // const input = document.createElement("input");
    // input.setAttribute("id", key);
    // input.setAttribute("value", data[key]);
    // input.addEventListener("change", writeModel);
    // existingContentContainer.appendChild(input);

    inputField(key, data[key], existingContentContainer);

    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "x";
    // deleteButton.addEventListener("click", () => {
    //   if (confirm("Are you sure you want to delete this input?")) {
    //     label.remove();
    //     input.remove();
    //     deleteButton.remove();

    //     writeModel();

    //     console.log("deleted from dataContent");
    //   }
    // });
    // existingContentContainer.appendChild(deleteButton);

    deleteButton(key, existingContentContainer);

    const br = document.createElement("br");
    existingContentContainer.appendChild(br);
  }
}
