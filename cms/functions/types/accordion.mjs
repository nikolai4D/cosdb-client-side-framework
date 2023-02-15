export function accordion(header, body, id) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const bodyId = "accordion-body-" + id;

  const headerAccordion = document.createElement("div");
  headerAccordion.classList.add("accordion-header");
  headerAccordion.appendChild(header);
  headerAccordion.addEventListener("click", () => {
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.id = bodyId;
  bodyEl.appendChild(body);

  accordion.appendChild(headerAccordion);
  accordion.appendChild(bodyEl);

  return accordion;
}
