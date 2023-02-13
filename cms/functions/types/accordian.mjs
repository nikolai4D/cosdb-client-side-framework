export function accordian() {
  return `   
    <div class="accordion">
        <div class="accordion-header">Accordion Item 1</div>
        <div class="accordion-body">This is the body of accordion item 1.</div>
    </div>`;
}

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.parentElement;
    const accordionBody = accordion.querySelector(".accordion-body");
    accordionBody.style.display =
      accordionBody.style.display === "none" ? "block" : "none";
  });
});
