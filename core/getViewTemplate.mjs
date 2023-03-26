import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers.mjs";
import { getComponents } from "./getComponents.mjs";

export async function getViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);

  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // Create a new div from type
  const div = document.createElement("div");
  div.classList.add(type);
  div.setAttribute("id", id);

  // get the viewTemplate

  const components = await getComponents(id);
  console.log("components", components);

  const viewTemplateObject = await createComponent(type, value);

  viewTemplateObject.slots = components;
  console.log("viewTemplateObject 1", viewTemplateObject); //1

  const renderViewTemplate = await viewTemplateObject.render(); //2

  console.log("renderViewTemplate 3", renderViewTemplate); //3

  const renderViewTemplateArray = Array.from(renderViewTemplate);

  for (const child of renderViewTemplateArray) {
    div.appendChild(child);
  }

  console.log("div from getViewTemplate", div); //4

  // div.appendChild(renderViewTemplate);

  return div;
}
