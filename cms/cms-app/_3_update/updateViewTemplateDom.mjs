export function updateViewTemplateDom(viewTemplateData) {
  const accordionBodyId = "accordion-body-" + id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + id + " deleted");
  }
}
