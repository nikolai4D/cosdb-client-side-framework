import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createViewTemplate } from "./helpers.mjs";
import { Components } from "./Components.mjs";
import { createComponent } from "./helpers.mjs";

export async function ViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(viewTemplate);
  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // Create a new div from type
  const div = document.createElement("div");
  div.classList.add(type);
  div.setAttribute("id", id);

  // get the viewTemplate

  const components = await Components(id);

  const viewTemplateObject = await createViewTemplate(type, value, components);
  const renderViewTemplate = await viewTemplateObject.render();

  const renderViewTemplateArray = Array.from(renderViewTemplate);

  for (const child of renderViewTemplateArray) {
    div.appendChild(child);
  }

  return div;
}