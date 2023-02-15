import { dropdown } from "./dropdown.mjs";
import { accordian } from "./accordian.mjs";

export function accordianDropdown(
  body,
  key,
  values,
  selectedValue,
  id,
  keyDisabled
) {
  const header = dropdown(key, values, selectedValue, id, keyDisabled);
  const bodyContent = body;

  const accordianDropdown = accordian(header, bodyContent);

  //   const accordianDropdown = document.createElement("div");
  //   accordianDropdown.classList.add("accordianDropdown");

  //   const header = document.createElement("div");
  //   header.classList.add("accordianDropdown-header");
  //   header.appendChild(dropdown(values, selectedValue, id));
  //   header.addEventListener("click", () => {
  //     bodyEl.classList.toggle("open");
  //   });

  //   const bodyEl = document.createElement("div");
  //   bodyEl.classList.add("accordianDropdown-body");
  //   bodyEl.appendChild(body);

  //   accordianDropdown.appendChild(header);
  //   accordianDropdown.appendChild(bodyEl);

  return accordianDropdown;
}
