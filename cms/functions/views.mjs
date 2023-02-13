import { readModel } from "./requests/readModel.mjs";
import { accordian } from "./types/accordian.mjs";
import { View } from "./View.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";
import { Organism } from "./Organism.mjs";
import { Molecule } from "./Molecule.mjs";
import { Atom } from "./Atom.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);

  for (const v of views) {
    const { view } = v;
    const viewDiv = document.createElement("div");
    viewDiv.id = view;
    viewDiv.innerHTML = accordian("view", view, View(accordian("viewTemp", "viewTemp", ViewTemplate(accordian("org", "org", Organism(accordian("mol", "mol", Molecule(accordian("atom", "atom", Atom("ATOM!"))))))))))));
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
