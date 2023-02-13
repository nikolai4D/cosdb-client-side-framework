export function dropdown(values, selectedValue) {
  let dropdown = "<select>";

  for (const value of values) {
    dropdown += `<option value="${value}"${
      value === selectedValue ? " selected" : ""
    }>${value}</option>`;
  }

  dropdown += "</select>";

  return dropdown;
}
