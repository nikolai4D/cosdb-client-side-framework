import { input } from "./input.mjs";

export function accordian(key, value, body) {
  return `   
    <div class="accordion">
        <div class="accordion-header">${input(key, value)}</div>
        <div class="accordion-body">${body}</div>
    </div>`;
}
