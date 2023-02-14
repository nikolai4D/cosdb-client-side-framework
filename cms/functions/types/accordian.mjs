import { input } from "./input.mjs";

// export function accordian(key, value, body, keyDisabled) {
//   return `
//     <div class="accordion">
//         <div class="accordion-header">${input(key, value, keyDisabled)}</div>
//         <div class="accordion-body">${body}</div>
//     </div>`;
// }

export function accordian(key, value, body, keyDisabled) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const header = document.createElement("div");
  header.classList.add("accordion-header");
  header.appendChild(input(key, value, keyDisabled));
  accordion.appendChild(header);

  const bodyEl = document.createElement("div");
  bodyEl.classList.add("accordion-body");
  bodyEl.innerHTML = body;
  accordion.appendChild(bodyEl);

  accordion.addEventListener("click", (event) => {
    const target = event.target;
    const accordionBody = target.parentElement.querySelector(".accordion-body");
    accordionBody.classList.toggle("open");
  });

  return accordion.outerHTML;
}
