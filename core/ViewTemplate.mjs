import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createViewTemplate } from "./helpers.mjs";
import { Slots } from "./Slots.mjs";

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

  const slots = await Slots(id);

  const viewTemplateObject = await createViewTemplate(type, value, slots);
  const renderViewTemplate = await viewTemplateObject.render();
  console.log(renderViewTemplate);

  const renderViewTemplateArray = Array.from(renderViewTemplate);

  for (const child of renderViewTemplateArray) {
    console.log(child, "child");
    div.appendChild(child);
  }

  return div;
}
