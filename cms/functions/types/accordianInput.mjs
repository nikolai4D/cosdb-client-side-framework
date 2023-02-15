import { input } from "./input.mjs";
import { accordian } from "./accordian.mjs";

export function accordianInput(body, key, value, id, keyDisabled) {
  const headerContent = input(key, value, id, keyDisabled);
  const bodyContent = body;

  const accordianInput = accordian(headerContent, bodyContent);

  //   const accordianInput = document.createElement("div");
  //   accordianInput.classList.add("accordianInput");

  //   const header = document.createElement("div");
  //   header.classList.add("accordianInput-header");
  //   header.appendChild(dropdown(values, selectedValue, id));
  //   header.addEventListener("click", () => {
  //     bodyEl.classList.toggle("open");
  //   });

  //   const bodyEl = document.createElement("div");
  //   bodyEl.classList.add("accordianInput-body");
  //   bodyEl.appendChild(body);

  //   accordianInput.appendChild(header);
  //   accordianInput.appendChild(bodyEl);

  return accordianInput;
}
