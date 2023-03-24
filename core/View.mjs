import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { ViewTemplate } from "./ViewTemplate.mjs";
//import { ViewTester2 } from "./ViewTester2.mjs"; //for testing - delete later

export async function View(viewPath) {
  const type = "view";

  //validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  const id = newView.id;
  const value = newView.value;

  //set browser history
  window.history.pushState({ viewPath: value }, "", value);

  //delete previous view
  await deletePreviousView();

  // Create a new div from type
  const div = document.createElement("div");
  div.classList.add(type);
  div.setAttribute("id", id);

  // Create a new viewTemplate
  const divChild = await ViewTemplate(id);
  console.log(divChild, "divChild");
  div.appendChild(divChild);

  // Append the view to the body
  document.body.appendChild(div);
}

function deletePreviousView() {
  const previousDiv = document.querySelector(".view");

  if (previousDiv) {
    previousDiv.remove();
  }
}
