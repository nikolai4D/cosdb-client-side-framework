import { handleSave } from "./handleSave.mjs";

export async function createNew(contentContainer, buttonsContainer, keys) {
  const createNew = document.createElement("button");
  createNew.textContent = "Add";
  createNew.addEventListener("click", () => {
    const keyInput = document.createElement("input");
    keyInput.setAttribute("placeholder", "Key");
    keyInput.setAttribute("id", "newKeyInput");
    contentContainer.appendChild(keyInput);

    const addKeyButton = document.createElement("button");
    addKeyButton.textContent = "Add Key";
    addKeyButton.addEventListener("click", () => {
      const key = keyInput.value;
      if (keys.includes(key)) {
        alert(
          `A key with the title ${key} already exists. Please choose a different title.`
        );
        return;
      }
      const label = document.createElement("label");
      label.textContent = key;
      contentContainer.appendChild(label);

      const input = document.createElement("input");
      input.setAttribute("id", key);
      input.setAttribute("value", "");
      input.addEventListener("change", handleSave);
      contentContainer.appendChild(input);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete?"
        );
        if (confirmDelete) {
          label.remove();
          input.remove();
          deleteButton.remove();
          handleSave();
          console.log("deleted from createNew");
        }
      });
      contentContainer.appendChild(deleteButton);

      const br = document.createElement("br");
      contentContainer.appendChild(br);

      keyInput.remove();
      addKeyButton.remove();
    });
    contentContainer.appendChild(addKeyButton);
  });
  buttonsContainer.appendChild(createNew);
}
