import { readModel } from "./requests/readModel.mjs";
import { ViewDiv } from "./components/ViewDiv.mjs";

export async function cms_app() {
  // render existing views
  //   const data = await readModel();
  //   const views = data.views;
  //   for (const view of views) {
  //     const viewDiv = await ViewDiv(view);
  //     document.body.appendChild(viewDiv);
  //   }

  // create "Add View" button and add event listener to open form
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
