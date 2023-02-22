import { readModel } from "../requests/readModel.mjs";
import { writeModel } from "../requests/writeModel.mjs";

export async function accordion(
  headerContent,
  bodyContent,
  customType,
  key,
  value,
  id,
  parentId
) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const bodyId = "accordion-body-" + id;

  const headerAccordion = document.createElement("div");
  headerAccordion.classList.add("accordion-header");
  headerAccordion.appendChild(headerContent);

  headerAccordion.addEventListener("click", (event) => {
    if (event.target.tagName === "OPTION") {
      event.stopPropagation();
      return;
    }
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.id = bodyId;

  bodyEl.appendChild(await bodyContent);

  accordion.appendChild(headerAccordion);
  accordion.appendChild(bodyEl);

  return accordion;
}
