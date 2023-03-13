export function getAccordionBody(id) {
  const accordionBody = document.getElementById("accordion-body-" + id);
  while (accordionBody.firstChild) {
    accordionBody.removeChild(accordionBody.firstChild);
  }
  return accordionBody;
}
