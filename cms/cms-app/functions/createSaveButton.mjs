import { State, action } from "../State.mjs";

export async function createSaveButton() {
  const createSaveButton = document.createElement("button");
  createSaveButton.textContent = "Save";
  createSaveButton.classList.add("createSaveButton");
  createSaveButton.addEventListener("click", async () => {
    action.updateModel(State);
  });
  document.body.appendChild(createSaveButton);
}
