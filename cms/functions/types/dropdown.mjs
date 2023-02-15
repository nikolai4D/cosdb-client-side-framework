export function dropdown(key, values, selectedValue, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const selectEl = document.createElement("select");
  selectEl.id = id;
  selectEl.disabled = keyDisabled;
  selectEl.addEventListener("change", () => change(id, key));
  selectEl.addEventListener("change", (event) => {
    // Disable the dropdown to trigger accordian
    event.stopPropagation();
    console.log("event.stopPropagation() called");
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
    console.log("viewTemplate changed");

    const accordionBody = document.getElementById("my-accordion-body");
    if (accordionBody) {
      try {
        const response = await fetch("");
        const data = await response.text();
        accordionBody.innerHTML = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
