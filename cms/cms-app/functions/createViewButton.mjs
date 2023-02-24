import { newView } from "../_1_view/newView.mjs";
import { View } from "../_1_view/View.mjs";
import { State } from "../State.mjs";

export async function createViewButton() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    document.body.insertBefore(
      await View(await newView()),
      document.body.children[1]
    );
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
console.log({State})

}
