import { readModel } from "./requests/readModel.mjs";
import { accordian } from "./types/accordian.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);

  for (const v of views) {
    const { view, id } = v;
    const viewDiv = document.createElement("div");
    viewDiv.id = id;
    viewDiv.className = "view";
    viewDiv.innerHTML = accordian();
    document.body.appendChild(viewDiv);
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordion = header.parentElement;
      const accordionBody = accordion.querySelector(".accordion-body");
      accordionBody.style.display =
        accordionBody.style.display === "none" ? "block" : "none";
    });
  });
}
