import { input } from "./input.mjs";

export function accordian(key, value, body, keyDisabled) {
  return `   
    <div class="accordion">
        <div class="accordion-header">${input(key, value, keyDisabled)}</div>
        <div class="accordion-body">${body}</div>
    </div>`;
}
