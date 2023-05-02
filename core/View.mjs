import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getViewTemplate } from "./getViewTemplate.mjs";
import { createElement } from "./helpers/createElement.mjs";
import { State } from "../data-mgmt/State.mjs";
import { updateDOM } from "./helpers/updateDOM.mjs";

export async function View(viewPath, updateHistory = true) {
  const type = "view";

  //validate and authenticate path
  const newView = await apiCallGet(`/api/auth/${viewPath}`);
  const id = newView.id;
  const value = newView.value;

  //set components to state
  if (!State.components) {
    State.components = {};
    State.components.viewTemplates = await apiCallGet(
      `/api/read/viewTemplates`
    );
    State.components.slots = await apiCallGet(`/api/read/slots`);
    State.components.components = await apiCallGet(`/api/read/components`);
    State.components.organisms = await apiCallGet(`/api/read/organisms`);
    State.components.molecules = await apiCallGet(`/api/read/molecules`);
    State.components.atoms = await apiCallGet(`/api/read/atoms`);
    State.components.atomValues = await apiCallGet(`/api/read/atomValues`);
    State.components.functions = await apiCallGet(`/api/read/functions`);
  }

  // set browser history only if updateHistory is true
  if (updateHistory) {
    window.history.pushState({ viewPath: value }, "", value);
  }

  // Create a new viewTemplate
  const divChild = await getViewTemplate(id);

  // Create a new div from type
  const div = await createElement("div", { class: type, id: id }, divChild);

  // Find the previous view
  const previousView = document.querySelector(".view");

  // Update the previous view with the new view or append the new view if no previous view exists
  if (previousView) {
    updateDOM(previousView, div);
  } else {
    document.body.appendChild(div);
  }
}
