import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getViewTemplate } from "./getViewTemplate.mjs";
import { createElement } from "./helpers/createElement.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function View(viewPath) {
  const type = "view";

  //validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  const id = newView.id;
  const value = newView.value;

  //set components to state
  if (!State.components) {
    State.components = {};
    State.components.viewTemplates = await apiCallGet(`/read/viewTemplates`);
    State.components.slots = await apiCallGet(`/read/slots`);
    State.components.components = await apiCallGet(`/read/components`);
    State.components.organisms = await apiCallGet(`/read/organisms`);
    State.components.molecules = await apiCallGet(`/read/molecules`);
    State.components.atoms = await apiCallGet(`/read/atoms`);
    State.components.atomValues = await apiCallGet(`/read/atomValues`);
    State.components.functions = await apiCallGet(`/read/functions`);
  }

  //set browser history
  window.history.pushState({ viewPath: value }, "", value);

  //delete previous view
  await deletePreviousView();

  //   // Create a new div from type
  //   const div = document.createElement("div");
  //   div.classList.add(type);
  //   div.setAttribute("id", id);

  // Create a new viewTemplate
  const divChild = await getViewTemplate(id);

  //   div.appendChild(divChild);

  // Create a new div from type
  const div = await createElement("div", { class: type, id: id }, divChild);

  // Append the view to the body
  document.body.appendChild(div);
}

function deletePreviousView() {
  const previousDiv = document.querySelector(".view");

  if (previousDiv) {
    previousDiv.remove();
  }
}
