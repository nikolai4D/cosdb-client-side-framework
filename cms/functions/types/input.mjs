// import { writeModel } from "./requests/writeModel.mjs";

export function input(key, value, keyDisabled) {
  const input = `
      <label>${key}:</label>
      <input value="${value}" disabled="${keyDisabled}">
    `;

  return input;
}
