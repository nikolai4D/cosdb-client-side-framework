export function input(key, value, id, keyDisabled = false) {
  const labelEl = document.createElement("label");
  labelEl.textContent = key + ":";

  const inputEl = document.createElement("input");
  inputEl.value = value;
  inputEl.disabled = keyDisabled;
  inputEl.id = id;
  inputEl.addEventListener("change", () => change(id));

  const container = document.createElement("div");
  container.appendChild(labelEl);
  container.appendChild(inputEl);

  return container;
}

function change(id) {
  console.log("changed id: " + id);
}
