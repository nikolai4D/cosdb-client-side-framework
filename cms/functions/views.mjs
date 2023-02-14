import { readModel } from "./requests/readModel.mjs";
import { View } from "./View.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  // render existing views
  for (const view of views) {
    const viewDiv = document.createElement("div");
    viewDiv.classList.add("view");
    const viewContent = View(view);
    viewDiv.appendChild(viewContent);
    document.body.appendChild(viewDiv);
  }

  // create "Add View" button and add event listener to open form
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("add button clicked");
    const viewDiv = document.createElement("div");
    viewDiv.classList.add("view");
    const view = { view: "New View", viewTemplate: "", slots: [] };
    const viewContent = View(view);
    viewDiv.appendChild(viewContent);
    document.body.insertBefore(viewDiv, document.body.children[1]);
    // const accordionBody = viewDiv.querySelector(".accordion-body");
    // accordionBody.classList.toggle("closed");
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);

  // apply accordion functionality
  //   accordianFunction();
}

// function accordianFunction() {
//   document.body.addEventListener("click", function (event) {
//     const header = event.target.closest(".accordion-header");
//     if (header) {
//       const accordion = header.parentElement;
//       const accordionBody = accordion.querySelector(".accordion-body");
//       accordionBody.classList.toggle("open");
//     }
//   });
// }
