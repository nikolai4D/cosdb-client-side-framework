import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createComponent } from "./helpers.mjs";

export async function ViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(viewTemplate);
  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // get the viewTemplate

  const viewTemplateObject = await createComponent(type, value);
  console.log(viewTemplateObject.slots, "viewTemplateObject.slots");

  return viewTemplateObject;
}
