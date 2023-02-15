export function accordian(header, body) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const headerAccordian = document.createElement("div");
  headerAccordian.classList.add("accordion-header");
  headerAccordian.appendChild(header);
  headerAccordian.addEventListener("click", () => {
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.appendChild(body);

  accordion.appendChild(headerAccordian);
  headerAccordian.appendChild(bodyEl);

  return accordion;
}
