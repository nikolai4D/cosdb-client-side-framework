// import { writeModel } from "./requests/writeModel.mjs";

export function input(key, value, keyDisabled) {
  let disabled = "";

  if (keyDisabled) {
    disabled = `disabled = "true"`;
  }

  const input = `
      <label>${key}:</label>
      <input value="${value}" ${disabled}>
    `;

  return input;
}
