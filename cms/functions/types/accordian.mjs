export function accordian(key, value, body) {
  return `   
    <div class="accordion">
        <div class="accordion-header">${key}: ${value}</div>
        <div class="accordion-body">${body}</div>
    </div>`;
}
