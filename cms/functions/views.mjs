import { readModel } from "./requests/readModel.mjs";
import { View } from "./View.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  // create "Add View" button and add event listener to open form
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", () => {
    console.log("add button clicked");
    const div = document.createElement("div");
    const view = { view: "New View", viewTemplate: "", slots: [] };
    div.innerHTML = View(view);
    document.body.insertBefore(div, document.body.children[1]);
    //accordian();
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);

  // render existing views
  for (const view of views) {
    const div = document.createElement("div");
    div.innerHTML = View(view);
    document.body.appendChild(div);
  }

  accordian();
}

function accordian() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordion = header.parentElement;
      const accordionBody = accordion.querySelector(".accordion-body");
      accordionBody.classList.toggle("open");
    });
  });
}
