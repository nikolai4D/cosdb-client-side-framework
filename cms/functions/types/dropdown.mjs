export function dropdown(values, selectedValue, id) {
  const selectEl = document.createElement("select");
  selectEl.id = id;

  for (const value of values) {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.selected = value === selectedValue;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  }

  return selectEl;
}
