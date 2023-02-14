import { readModel } from "./requests/readModel.mjs";
import { View } from "./View.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  // create "Add View" button and add event listener to open form
  const addButton = document.createElement("button");
  addButton.textContent = "Create View";
  addButton.addEventListener("click", () => {
    console.log("add button clicked");

    // append form to document body
    document.body.appendChild(form);
  });
  document.body.insertBefore(addButton, document.body.firstChild);

  // render existing views
  for (const view of views) {
    const div = document.createElement("div");
    div.innerHTML = View(view);
    document.body.appendChild(div);
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordion = header.parentElement;
      const accordionBody = accordion.querySelector(".accordion-body");
      accordionBody.classList.toggle("open");
    });
  });
}
