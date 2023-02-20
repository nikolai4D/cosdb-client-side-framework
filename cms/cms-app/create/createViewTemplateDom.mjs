export async function createViewTemplateDom(viewTemplateData) {
  console.log(viewTemplateData, "viewTemplateData");
  const pElement = document.createElement("p");
  pElement.textContent = "createViewTemplateDom";

  return pElement;
}
