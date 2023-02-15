export function accordian(header, body, id) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const bodyId = "accordion-body-" + id;

  const headerAccordian = document.createElement("div");
  headerAccordian.classList.add("accordion-header");
  headerAccordian.appendChild(header);
  headerAccordian.addEventListener("click", () => {
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.id = bodyId;
  bodyEl.appendChild(body);

  accordion.appendChild(headerAccordian);
  accordion.appendChild(bodyEl);

  return accordion;
}
