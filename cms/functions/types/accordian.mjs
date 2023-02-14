import { input } from "./input.mjs";

export function accordian(key, value, body, keyDisabled, id) {
  return `
    <div class="accordion">
        <div class="accordion-header">${input(
          key,
          value,
          keyDisabled,
          id
        )}</div>
        <div class="accordion-body">${body}</div>
    </div>`;
}
