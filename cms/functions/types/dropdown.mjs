export function dropdown(key, values, selectedValue, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = keyDisabled;
  selectEl.addEventListener("change", (event) => {
    change(id, key);
    event.stopPropagation();
  });

  for (const value of values) {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.selected = value === selectedValue;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  }

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(selectEl);

  return container;
}

async function change(id, key) {
  console.log("changed " + key + ": " + id);
  if (key === "viewTemplate") {
    const accordionBodyId = "accordion-body-" + id;
    const accordionBody = document.getElementById(accordionBodyId);
    if (accordionBody) {
      while (accordionBody.firstChild) {
        accordionBody.removeChild(accordionBody.firstChild);
      }
      console.log("accordion-body-" + id + " deleted");
    }
  }
}
