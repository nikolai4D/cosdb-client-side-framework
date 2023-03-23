import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { createViewTemplate } from "./helpers.mjs";

export async function ViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(viewTemplate);
  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // get the viewTemplate

  const slot1 = document.createElement("div");
  const h1Element1 = document.createElement("h1");
  h1Element1.textContent = "1 dom";
  slot1.appendChild(h1Element1);

  const slot2 = document.createElement("div");
  const h2Element2 = document.createElement("h2");
  h2Element2.textContent = "2 dom";
  slot2.appendChild(h2Element2);

  const content = [
    { slot: "slot3", content: slot1 },
    { slot: "slot4", content: slot2 },
  ];

  const viewTemplateObject = await createViewTemplate(type, value, content);
  console.log(viewTemplateObject.slots, "viewTemplateObject.slots");

  return viewTemplateObject;
}
