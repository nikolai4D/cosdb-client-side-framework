// import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { getViewTemplate } from "./getViewTemplate.mjs";
// import { createElement } from "./helpers/createElement.mjs";
// import { State } from "../data-mgmt/State.mjs";

// export async function View(viewPath) {
//   const type = "view";

//   //validate and authenticate path
//   const newView = await apiCallGet(`/auth/${viewPath}`);
//   const id = newView.id;
//   const value = newView.value;

//   //set components to state
//   if (!State.components) {
//     State.components = {};
//     State.components.viewTemplates = await apiCallGet(`/read/viewTemplates`);
//     State.components.slots = await apiCallGet(`/read/slots`);
//     State.components.components = await apiCallGet(`/read/components`);
//     State.components.organisms = await apiCallGet(`/read/organisms`);
//     State.components.molecules = await apiCallGet(`/read/molecules`);
//     State.components.atoms = await apiCallGet(`/read/atoms`);
//     State.components.atomValues = await apiCallGet(`/read/atomValues`);
//     State.components.functions = await apiCallGet(`/read/functions`);
//   }

//   //set browser history
//   window.history.pushState({ viewPath: value }, "", value);

//   //delete previous view
//   await deletePreviousView();

//   // Create a new viewTemplate
//   const divChild = await getViewTemplate(id);

//   // Create a new div from type
//   const div = await createElement("div", { class: type, id: id }, divChild);

//   // Append the view to the body
//   document.body.appendChild(div);
// }

// function deletePreviousView() {
//   const previousDiv = document.querySelector(".view");

//   if (previousDiv) {
//     previousDiv.remove();
//   }
// }

import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getViewTemplate } from "./getViewTemplate.mjs";
import { createElement } from "./helpers/createElement.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function View(viewPath) {
  const type = "view";

  // validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  const id = newView.id;
  const value = newView.value;

  // set components to state
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

  // set browser history
  window.history.pushState({ viewPath: value }, "", value);

  // delete previous view
  await deletePreviousView();

  // Create a new viewTemplate
  const newViewTemplate = await getViewTemplate(id);

  // Create a new div from type
  const newDiv = await createElement(
    "div",
    { class: type, id: id },
    newViewTemplate
  );

  // get existing view div
  const existingDiv = document.querySelector(".view");

  // append only new or updated elements
  if (!existingDiv) {
    // no existing view, append the new div to the body
    document.body.appendChild(newDiv);
  } else {
    // compare the two DOM structures
    const newChildren = Array.from(newDiv.children);
    const existingChildren = Array.from(existingDiv.children);

    // append only new or updated elements
    newChildren.forEach((child) => {
      const matchingChild = existingChildren.find((c) => c.isEqualNode(child));
      if (!matchingChild) {
        existingDiv.appendChild(child);
      }
    });
  }
}

function deletePreviousView() {
  const previousDiv = document.querySelector(".view");

  if (previousDiv) {
    previousDiv.remove();
  }
}
