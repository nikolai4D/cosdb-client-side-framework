export function accordian(header, body) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");
  console.log("header: " + header);
  const id = header.id;
  console.log("id: " + id);
  const bodyId = "accordion-body#" + id;
  console.log("bodyId: " + bodyId);

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
