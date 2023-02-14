import { readModel } from "./requests/readModel.mjs";
// import { View } from "./View.mjs";
import { ViewDiv } from "./types/ViewDiv.mjs";

export async function views() {
  // render existing views
  const data = await readModel();
  const views = data.views;
  for (const view of views) {
    const viewDiv = ViewDiv(view);
    // const viewDiv = document.createElement("div");
    // viewDiv.classList.add("view");
    // const viewContent = View(view);
    // viewDiv.appendChild(viewContent);
    document.body.appendChild(viewDiv);
  }

  // create "Add View" button and add event listener to open form
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("add button clicked");

    const view = { view: "New View", viewTemplate: "", slots: [] };
    const viewDiv = ViewDiv(view);

    // const viewDiv = document.createElement("div");
    // viewDiv.classList.add("view");
    // const view = { view: "New View", viewTemplate: "", slots: [] };
    // const viewContent = View(view);
    // viewDiv.appendChild(viewContent);
    document.body.insertBefore(viewDiv, document.body.children[1]);
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
