export function accordian(header, body, id) {
  const accordian = document.createElement("div");
  accordian.classList.add("accordian");

  const bodyId = "accordian-body-" + id;

  const headerAccordian = document.createElement("div");
  headerAccordian.classList.add("accordian-header");
  headerAccordian.appendChild(header);
  headerAccordian.addEventListener("click", () => {
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordian-body");
  bodyEl.id = bodyId;
  bodyEl.appendChild(body);

  accordian.appendChild(headerAccordian);
  accordian.appendChild(bodyEl);

  return accordian;
}
