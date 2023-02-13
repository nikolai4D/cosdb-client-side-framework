export function dropdown(values, selectedValue) {
  const dropdown = document.createElement("select");

  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.text = value;
    dropdown.add(option);
  }

  dropdown.value = selectedValue;

  return dropdown;
}
