import { readModel } from "./requests/readModel.mjs";
import { accordian } from "./types/accordian.mjs";
import { View } from "./View.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";
import { Organism } from "./Organism.mjs";
import { Molecule } from "./Molecule.mjs";
import { Atom } from "./Atom.mjs";
import { Slot } from "./Slot.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);

  for (const view of views) {
    const div = document.createElement("div");
    div.id = view.view;
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
