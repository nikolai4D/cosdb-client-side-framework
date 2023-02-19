export async function createViewTemplateDom() {
  console.log("reached createViewTemplateDom()");
  const pElement = document.createElement("p");
  pElement.textContent = "createViewTemplateDom";

  return pElement;
}
