import { action_deleteView } from "../data-mgmt/actions/action_deleteView.mjs";

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
  accordion.classList.add("accordion" + "-" + customType);

  const bodyId = "accordion-body-" + id;

  const headerAccordion = document.createElement("div");
  headerAccordion.classList.add("accordion-header");
  headerAccordion.classList.add("accordion-header" + "-" + customType);
  headerAccordion.appendChild(await headerContent);

  // Append delete button to inner accordion header
  if (customType === "view") {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete?")) {
        await action_deleteView(id);
        headerAccordion.parentElement.remove();
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
  bodyEl.classList.add("accordion-body" + "-" + customType);
  bodyEl.id = bodyId;

  bodyEl.appendChild(await bodyContent);

  accordion.appendChild(headerAccordion);
  accordion.appendChild(bodyEl);

  return accordion;
}
