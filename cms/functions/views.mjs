import { readModel } from "./requests/readModel.mjs";
import { View } from "./View.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

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
