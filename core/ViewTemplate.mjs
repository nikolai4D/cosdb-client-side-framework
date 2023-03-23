import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers.mjs";

export async function ViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(viewTemplate);
  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  //   // Create a new div from type
  //   const div = document.createElement("div");
  //   div.classList.add(type);
  //   div.setAttribute("id", id);
  //   const h1Element = document.createElement("h1");
  //   h1Element.textContent = value;
  //   div.appendChild(h1Element);

  // get the viewTemplate

  const viewTemplateObject = await createComponent(type, value);

  return viewTemplateObject;
}
