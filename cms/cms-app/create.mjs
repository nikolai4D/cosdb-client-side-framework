import { ViewDiv } from "./components/ViewDiv.mjs";

export function create() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("add button clicked");

    const view = { view: "New View", viewTemplate: "", slots: [] };
    const viewDiv = await ViewDiv(view);
    document.body.insertBefore(viewDiv, document.body.children[1]);
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
