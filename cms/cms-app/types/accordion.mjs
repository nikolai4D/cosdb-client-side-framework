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
  headerAccordion.appendChild(await headerContent);

  // Append delete button to inner accordion header
  if (customType === "view") {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete?")) {
        console.log("delete view" + id);
        headerAccordion.parentElement.remove();
      }

      //   await mutation_deleteState("views", id);
      //   headerAccordion.parentElement.remove();
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

  bodyEl.appendChild(await bodyContent);

  accordion.appendChild(headerAccordion);
  accordion.appendChild(bodyEl);

  return accordion;
}
