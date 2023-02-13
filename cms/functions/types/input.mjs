// import { writeModel } from "./requests/writeModel.mjs";

export function input(key, value) {
  const input = `
      <label>${key}:</label>
      <input value="${value}">
    `;

  return input;
}
