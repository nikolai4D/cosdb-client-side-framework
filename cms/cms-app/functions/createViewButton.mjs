import { newView } from "../_1_view/newView.mjs";
import { View } from "../_1_view/View.mjs";

export async function createViewButton() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("createViewButton clicked");
    const newViewData = await newView();
    document.body.insertBefore(
      await View(newViewData),
      document.body.children[1]
    );
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
