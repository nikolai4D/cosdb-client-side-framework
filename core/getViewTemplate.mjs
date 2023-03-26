import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createViewTemplate } from "./helpers.mjs";
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

  const viewTemplateObject = await createViewTemplate(type, value, components);
  const renderViewTemplate = await viewTemplateObject.render();

  console.log("renderViewTemplate", renderViewTemplate);

  //const renderViewTemplateArray = Array.from(renderViewTemplate);
  //
  //   for (const child of renderViewTemplateArray) {
  //     div.appendChild(child);
  //   }
  //
  div.appendChild(renderViewTemplate);

  return div;
}
