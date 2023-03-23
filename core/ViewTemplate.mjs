import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function ViewTemplate(viewPath) {
  console.log({ viewPath });
  //validate and authenticate path
  const viewTemplates = await apiCallGet(`/read/viewTemplates`);
  const id = newView.id;
  const value = newView.value;

  //set browser history
  window.history.pushState({ viewPath: value }, "", value);
  console.log("window.history", window.history);

  //delete previous view
  await deletePreviousView();

  // Create a new view
  const viewDiv = document.createElement("div");
  viewDiv.classList.add("view");
  viewDiv.setAttribute("id", id);

  const viewContentDiv = await ViewTester2(value);
  viewDiv.appendChild(viewContentDiv);

  // Create a new viewTemplate
  //const viewTemplateDiv = await ViewTemplate(id);
  //viewDiv.appendChild(viewTemplateDiv);

  // Append the view to the body
  document.body.appendChild(viewDiv);
}

function deletePreviousView() {
  const previousDiv = document.querySelector(".view");

  if (previousDiv) {
    previousDiv.remove();
  }
}
