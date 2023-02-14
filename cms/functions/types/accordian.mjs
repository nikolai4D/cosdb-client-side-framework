import { input } from "./input.mjs";

export function accordian(key, value, body, keyDisabled, id) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const header = document.createElement("div");
  header.classList.add("accordion-header");
  header.appendChild(input(key, value, keyDisabled, id));
  header.addEventListener("click", () => {
    bodyEl.classList.toggle("open");
  });

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.appendChild(body);

  accordion.appendChild(header);
  accordion.appendChild(bodyEl);

  return accordion;
}
