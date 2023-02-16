export function accordion(header, body, id, key) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const bodyId = "accordion-body-" + id;

  const headerAccordion = document.createElement("div");
  headerAccordion.classList.add("accordion-header");
  headerAccordion.appendChild(header);

  if (key === "view") {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.id = id;
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this view?")) {
        console.log("delete " + id);
        accordion.remove();
      }
    });
    headerAccordion.appendChild(deleteButton);
  }

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
  bodyEl.appendChild(body);

  accordion.appendChild(headerAccordion);
  accordion.appendChild(bodyEl);

  return accordion;
}
