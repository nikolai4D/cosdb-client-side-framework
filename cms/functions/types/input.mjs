export function input(key, value, keyDisabled, id) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const inputEl = document.createElement("input");
  inputEl.value = value;
  inputEl.disabled = keyDisabled;
  inputEl.id = id;

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  return container;
}
