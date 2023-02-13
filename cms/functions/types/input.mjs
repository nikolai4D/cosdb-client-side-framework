// import { writeModel } from "./requests/writeModel.mjs";

export function input(key, value, keyLock) {
  const input = `
      <label>${key}:</label>
      <input value="${value}" disabled="${keyLock}">
    `;

  return input;
}
