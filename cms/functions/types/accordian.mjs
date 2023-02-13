export function accordian(header, body) {
  return `   
    <div class="accordion">
        <div class="accordion-header">${header}</div>
        <div class="accordion-body">${body}</div>
    </div>`;
}
