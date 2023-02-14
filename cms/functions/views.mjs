import { readModel } from "./requests/readModel.mjs";
import { View } from "./View.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  // render existing views
  for (const view of views) {
    const div = document.createElement("div");
    div.innerHTML = View(view);
    document.body.appendChild(div);
  }

  // create "Add View" button and add event listener to open form
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("add button clicked");
    const div = document.createElement("div");
    const view = { view: "New View", viewTemplate: "", slots: [] };
    div.innerHTML = View(view);
    document.body.insertBefore(div, document.body.children[1]);
    await accordian();
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);

  // apply accordion functionality
  accordian();
}
function accordian() {
  document.body.addEventListener("click", function (event) {
    const header = event.target.closest(".accordion-header");
    if (header) {
      const accordion = header.parentElement;
      const accordionBody = accordion.querySelector(".accordion-body");
      accordionBody.classList.toggle("open");
    }
  });
}
